import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from '../entities/teacher.entity';

@Controller('api/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAll(): Promise<Teacher[]> {
    return this.teachersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Teacher> {
    const teacher = await this.teachersService.findOne(id);
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  @Post()
  create(@Body() teacherData: Partial<Teacher>): Promise<Teacher> {
    return this.teachersService.create(teacherData);
  }
}