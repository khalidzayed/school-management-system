import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timetable } from '../entities/timetable.entity';

interface CreateTimetableDto {
  class_id: number;
  subject_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(Timetable)
    private timetableRepository: Repository<Timetable>,
  ) {}

  findAll(): Promise<Timetable[]> {
    return this.timetableRepository.find({ relations: ['class', 'subject'] });
  }

  async findOne(id: number): Promise<Timetable | null> {
    return this.timetableRepository.findOne({ where: { id }, relations: ['class', 'subject'] });
  }

  async create(timetableData: CreateTimetableDto): Promise<Timetable> {
    if (!timetableData.class_id || !timetableData.subject_id || !timetableData.day_of_week || !timetableData.start_time || !timetableData.end_time) {
      throw new BadRequestException('Class ID, subject ID, day of week, start time, and end time are required');
    }
    const newTimetable = this.timetableRepository.create({
      class: { id: timetableData.class_id },
      subject: { id: timetableData.subject_id },
      day_of_week: timetableData.day_of_week,
      start_time: timetableData.start_time,
      end_time: timetableData.end_time,
    });
    return this.timetableRepository.save(newTimetable);
  }
}