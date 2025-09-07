import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../entities/class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
  ) {}

  findAll(): Promise<Class[]> {
    return this.classesRepository.find({ relations: ['teacher', 'teacher.user'] });
  }

  async findOne(id: number): Promise<Class | null> {
    const classEntity = await this.classesRepository.findOne({
      where: { id },
      relations: ['teacher', 'teacher.user'],
    });
    return classEntity;
  }

  async create(classData: Partial<Class>): Promise<Class> {
    if (!classData.name) {
      throw new BadRequestException('Class name is required');
    }
    const newClass = this.classesRepository.create(classData);
    return this.classesRepository.save(newClass);
  }
}