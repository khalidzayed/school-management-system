import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudyMaterialsService } from './study-materials.service';
import { CreateStudyMaterialDto } from './dto/create-study-material.dto';

@Controller('study-materials')
export class StudyMaterialsController {
  constructor(private readonly studyMaterialsService: StudyMaterialsService) {}

  
  @Get()
  findAll(@Query('subjectId') subjectId?: number) {
    return this.studyMaterialsService.findAll(subjectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyMaterialsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createStudyMaterialDto: CreateStudyMaterialDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      createStudyMaterialDto.file_path = `/uploads/${file.filename}`;
    }
    return this.studyMaterialsService.create(createStudyMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyMaterialsService.remove(+id);
  }
}