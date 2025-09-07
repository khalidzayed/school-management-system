import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teachersRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Teacher | null> {
    return this.teachersRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async create(teacherData: Partial<Teacher>): Promise<Teacher> {
    if (!teacherData.id) {
      throw new BadRequestException('Teacher ID is required');
    }
    const newTeacher = this.teachersRepository.create(teacherData);
    return this.teachersRepository.save(newTeacher);
  }
}