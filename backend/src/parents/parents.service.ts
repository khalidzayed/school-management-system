import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from '../entities/parent.entity';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private parentsRepository: Repository<Parent>,
  ) {}

  findAll(): Promise<Parent[]> {
    return this.parentsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Parent | null> {
    return this.parentsRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async create(parentData: Partial<Parent>): Promise<Parent> {
    if (!parentData.id) {
      throw new BadRequestException('Parent ID is required');
    }
    const newParent = this.parentsRepository.create(parentData);
    return this.parentsRepository.save(newParent);
  }
}