import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../entities/subject.entity';

interface CreateSubjectDto {
  class_id: number;
  teacher_id: number | null;
  name: string;
  code: string;
}

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  findAll(): Promise<Subject[]> {
    return this.subjectsRepository.find({ relations: ['class', 'teacher'] });
  }

  async findOne(id: number): Promise<Subject | null> {
    return this.subjectsRepository.findOne({ where: { id }, relations: ['class', 'teacher'] });
  }

  async create(subjectData: CreateSubjectDto): Promise<Subject> {
    if (!subjectData.name || !subjectData.code || !subjectData.class_id) {
      throw new BadRequestException('Subject name, code, and class ID are required');
    }

    const newSubject = this.subjectsRepository.create({
      class: { id: subjectData.class_id },
      teacher: subjectData.teacher_id ? { id: subjectData.teacher_id } : undefined,
      name: subjectData.name,
      code: subjectData.code,
    });

    return this.subjectsRepository.save(newSubject);
  }
}