import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from '../entities/grade.entity';

interface CreateGradeDto {
  exam_id: number;
  student_id: number;
  subject_id: number;
  marks_obtained: number;
  marks_total: number;
  grade: string;
}

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private gradesRepository: Repository<Grade>,
  ) {}

  findAll(): Promise<Grade[]> {
    return this.gradesRepository.find({ relations: ['exam', 'student', 'subject'] });
  }

  async findOne(id: number): Promise<Grade | null> {
    return this.gradesRepository.findOne({ where: { id }, relations: ['exam', 'student', 'subject'] });
  }

  async create(gradeData: CreateGradeDto): Promise<Grade> {
    if (!gradeData.exam_id || !gradeData.student_id || !gradeData.subject_id || !gradeData.marks_obtained || !gradeData.marks_total || !gradeData.grade) {
      throw new BadRequestException('Exam ID, student ID, subject ID, marks obtained, marks total, and grade are required');
    }
    const newGrade = this.gradesRepository.create({
      exam: { id: gradeData.exam_id },
      student: { id: gradeData.student_id },
      subject: { id: gradeData.subject_id },
      marks_obtained: gradeData.marks_obtained,
      marks_total: gradeData.marks_total,
      grade: gradeData.grade,
    });
    return this.gradesRepository.save(newGrade);
  }
}