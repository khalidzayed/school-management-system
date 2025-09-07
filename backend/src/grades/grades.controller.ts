import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { GradesService } from './grades.service';
import { Grade } from '../entities/grade.entity';

interface CreateGradeDto {
  exam_id: number;
  student_id: number;
  subject_id: number;
  marks_obtained: number;
  marks_total: number;
  grade: string;
}

@Controller('api/grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Get()
  findAll(): Promise<Grade[]> {
    return this.gradesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Grade> {
    const grade = await this.gradesService.findOne(id);
    if (!grade) {
      throw new NotFoundException(`Grade with ID ${id} not found`);
    }
    return grade;
  }

  @Post()
  create(@Body() gradeData: CreateGradeDto): Promise<Grade> {
    return this.gradesService.create(gradeData);
  }
}