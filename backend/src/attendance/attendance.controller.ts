import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from '../entities/attendance.entity';

interface CreateAttendanceDto {
  student_id: number;
  class_id: number;
  date: string;
  status: string;
}

@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Attendance> {
    const attendance = await this.attendanceService.findOne(id);
    if (!attendance) {
      throw new NotFoundException(`Attendance with ID ${id} not found`);
    }
    return attendance;
  }

  @Post()
  create(@Body() attendanceData: CreateAttendanceDto): Promise<Attendance> {
    return this.attendanceService.create(attendanceData);
  }
}