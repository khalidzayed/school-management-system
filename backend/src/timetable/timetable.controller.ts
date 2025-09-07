import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { Timetable } from '../entities/timetable.entity';

interface CreateTimetableDto {
  class_id: number;
  subject_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

@Controller('api/timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get()
  findAll(): Promise<Timetable[]> {
    return this.timetableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Timetable> {
    const timetable = await this.timetableService.findOne(id);
    if (!timetable) {
      throw new NotFoundException(`Timetable with ID ${id} not found`);
    }
    return timetable;
  }

  @Post()
  create(@Body() timetableData: CreateTimetableDto): Promise<Timetable> {
    return this.timetableService.create(timetableData);
  }
}