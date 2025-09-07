import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Class } from '../entities/class.entity';

@Controller('api/classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  findAll(): Promise<Class[]> {
    return this.classesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Class> {
    const classEntity = await this.classesService.findOne(id);
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return classEntity;
  }

  @Post()
  create(@Body() classData: Partial<Class>): Promise<Class> {
    return this.classesService.create(classData);
  }
}