import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from '../entities/student.entity';
import { Parent } from '../entities/parent.entity';
import { Class } from '../entities/class.entity';
import { Teacher } from '../entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Parent, Class, Teacher])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}