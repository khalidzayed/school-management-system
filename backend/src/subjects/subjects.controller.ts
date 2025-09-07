import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from '../entities/subject.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

interface CreateSubjectDto {
  class_id: number;
  teacher_id: number | null;
  name: string;
  code: string;
}

@Controller('api/subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Subject> {
    const subject = await this.subjectsService.findOne(id);
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return subject;
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('teacher')
  create(@Body() subjectData: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.create(subjectData);
  }
}