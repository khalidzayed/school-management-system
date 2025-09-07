import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyMaterialsService } from './study-materials.service';
import { StudyMaterialsController } from './study-materials.controller';
import { StudyMaterial } from '../entities/study-material.entity';
import { Class } from '../entities/class.entity';
import { Subject } from '../entities/subject.entity';
import { Teacher } from '../entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudyMaterial, Class, Subject, Teacher])],
  controllers: [StudyMaterialsController],
  providers: [StudyMaterialsService],
})
export class StudyMaterialsModule {}