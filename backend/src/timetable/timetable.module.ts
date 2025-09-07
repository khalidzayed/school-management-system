import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { Timetable } from '../entities/timetable.entity';
import { Class } from '../entities/class.entity';
import { Subject } from '../entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timetable, Class, Subject])],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}