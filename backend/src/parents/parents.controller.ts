import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { Parent } from '../entities/parent.entity';

@Controller('api/parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Get()
  findAll(): Promise<Parent[]> {
    return this.parentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Parent> {
    const parent = await this.parentsService.findOne(id);
    if (!parent) {
      throw new NotFoundException(`Parent with ID ${id} not found`);
    }
    return parent;
  }

  @Post()
  create(@Body() parentData: Partial<Parent>): Promise<Parent> {
    return this.parentsService.create(parentData);
  }
}