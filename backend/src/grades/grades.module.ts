import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { Grade } from '../entities/grade.entity';
import { Exam } from '../entities/exam.entity';
import { Student } from '../entities/student.entity';
import { Subject } from '../entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Exam, Student, Subject])],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}