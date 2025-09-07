import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';

interface CreateAttendanceDto {
  student_id: number;
  class_id: number;
  date: string;
  status: string;
}

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find({ relations: ['student', 'class'] });
  }

  async findOne(id: number): Promise<Attendance | null> {
    return this.attendanceRepository.findOne({ where: { id }, relations: ['student', 'class'] });
  }

  async create(attendanceData: CreateAttendanceDto): Promise<Attendance> {
    if (!attendanceData.student_id || !attendanceData.class_id || !attendanceData.date || !attendanceData.status) {
      throw new BadRequestException('Student ID, class ID, date, and status are required');
    }
    const newAttendance = this.attendanceRepository.create({
      student: { id: attendanceData.student_id },
      class: { id: attendanceData.class_id },
      date: attendanceData.date,
      status: attendanceData.status,
    });
    return this.attendanceRepository.save(newAttendance);
  }
}