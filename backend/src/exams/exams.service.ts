import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from '../entities/exam.entity';

interface CreateExamDto {
  class_id: number;
  name: string;
  date: string;
}

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private examsRepository: Repository<Exam>,
  ) {}

  findAll(): Promise<Exam[]> {
    return this.examsRepository.find({ relations: ['class'] });
  }

  async findOne(id: number): Promise<Exam | null> {
    return this.examsRepository.findOne({ where: { id }, relations: ['class'] });
  }

  async create(examData: CreateExamDto): Promise<Exam> {
    if (!examData.name || !examData.date || !examData.class_id) {
      throw new BadRequestException('Exam name, date, and class ID are required');
    }
    const newExam = this.examsRepository.create({
      class: { id: examData.class_id },
      name: examData.name,
      date: examData.date,
    });
    return this.examsRepository.save(newExam);
  }
}