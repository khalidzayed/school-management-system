import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { Announcement } from '../entities/announcement.entity';

@Controller('api/announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  findAll(): Promise<Announcement[]> {
    return this.announcementsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Announcement> {
    const announcement = await this.announcementsService.findOne(id);
    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
    return announcement;
  }

  @Post()
  create(@Body() announcementData: Partial<Announcement>): Promise<Announcement> {
    return this.announcementsService.create(announcementData);
  }
}