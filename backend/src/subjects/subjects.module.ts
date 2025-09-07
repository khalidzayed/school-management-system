import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { Subject } from '../entities/subject.entity';
import { Class } from '../entities/class.entity';
import { Teacher } from '../entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Class, Teacher])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}