import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { Download } from '../entities/download.entity';

interface CreateDownloadDto {
  material_id: number;
  student_id: number;
}

@Controller('api/downloads')
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

  @Get()
  findAll(): Promise<Download[]> {
    return this.downloadsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Download> {
    const download = await this.downloadsService.findOne(id);
    if (!download) {
      throw new NotFoundException(`Download with ID ${id} not found`);
    }
    return download;
  }

  @Post()
  create(@Body() downloadData: CreateDownloadDto): Promise<Download> {
    return this.downloadsService.create(downloadData);
  }
}