import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from '../entities/message.entity';

interface CreateMessageDto {
  sender_id: number;
  receiver_id: number;
  subject: string;
  body: string;
}

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Message> {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  @Post()
  create(@Body() messageData: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(messageData);
  }
}