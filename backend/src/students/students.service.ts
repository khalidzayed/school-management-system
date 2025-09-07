import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentsRepository.find({ relations: ['user', 'parent', 'class', 'class.teacher'] });
  }

  async findOne(id: number): Promise<Student | null> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['user', 'parent', 'class', 'class.teacher'],
    });
    return student;
  }

  async create(studentData: Partial<Student>): Promise<Student> {
    if (!studentData.id || !studentData.roll_number) {
      throw new BadRequestException('Student ID and roll_number are required');
    }
    const newStudent = this.studentsRepository.create(studentData);
    return this.studentsRepository.save(newStudent);
  }
}