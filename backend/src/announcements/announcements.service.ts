import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from '../entities/announcement.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private announcementsRepository: Repository<Announcement>,
  ) {}

  findAll(): Promise<Announcement[]> {
    return this.announcementsRepository.find({ relations: ['created_by'] });
  }

  async findOne(id: number): Promise<Announcement | null> {
    return this.announcementsRepository.findOne({ where: { id }, relations: ['created_by'] });
  }

  async create(announcementData: Partial<Announcement>): Promise<Announcement> {
    if (!announcementData.title || !announcementData.content || !announcementData.created_by) {
      throw new BadRequestException('Title, content, and created_by are required');
    }
    const newAnnouncement = this.announcementsRepository.create(announcementData);
    return this.announcementsRepository.save(newAnnouncement);
  }
}