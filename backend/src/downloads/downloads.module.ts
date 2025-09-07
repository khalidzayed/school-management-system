import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';
import { Download } from '../entities/download.entity';
import { StudyMaterial } from '../entities/study-material.entity';
import { Student } from '../entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Download, StudyMaterial, Student])],
  controllers: [DownloadsController],
  providers: [DownloadsService],
})
export class DownloadsModule {}