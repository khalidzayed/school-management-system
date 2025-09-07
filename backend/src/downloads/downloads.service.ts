import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Download } from '../entities/download.entity';

interface CreateDownloadDto {
  material_id: number;
  student_id: number;
}

@Injectable()
export class DownloadsService {
  constructor(
    @InjectRepository(Download)
    private downloadsRepository: Repository<Download>,
  ) {}

  findAll(): Promise<Download[]> {
    return this.downloadsRepository.find({ relations: ['material', 'student'] });
  }

  async findOne(id: number): Promise<Download | null> {
    return this.downloadsRepository.findOne({ where: { id }, relations: ['material', 'student'] });
  }

  async create(downloadData: CreateDownloadDto): Promise<Download> {
    if (!downloadData.material_id || !downloadData.student_id) {
      throw new BadRequestException('Material ID and student ID are required');
    }
    const newDownload = this.downloadsRepository.create({
      material: { id: downloadData.material_id },
      student: { id: downloadData.student_id },
    });
    return this.downloadsRepository.save(newDownload);
  }
}