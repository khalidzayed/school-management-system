import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { Exam } from '../entities/exam.entity';

interface CreateExamDto {
  class_id: number;
  name: string;
  date: string;
}

@Controller('api/exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  findAll(): Promise<Exam[]> {
    return this.examsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
    const exam = await this.examsService.findOne(id);
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }
    return exam;
  }

  @Post()
  create(@Body() examData: CreateExamDto): Promise<Exam> {
    return this.examsService.create(examData);
  }
}