import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';

interface CreateMessageDto {
  sender_id: number;
  receiver_id: number;
  subject: string;
  body: string;
}

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  findAll(): Promise<Message[]> {
    return this.messagesRepository.find({ relations: ['sender', 'receiver'] });
  }

  async findOne(id: number): Promise<Message | null> {
    return this.messagesRepository.findOne({ where: { id }, relations: ['sender', 'receiver'] });
  }

  async create(messageData: CreateMessageDto): Promise<Message> {
    if (!messageData.sender_id || !messageData.receiver_id || !messageData.subject || !messageData.body) {
      throw new BadRequestException('Sender ID, receiver ID, subject, and body are required');
    }
    const newMessage = this.messagesRepository.create({
      sender: { id: messageData.sender_id },
      receiver: { id: messageData.receiver_id },
      subject: messageData.subject,
      body: messageData.body,
    });
    return this.messagesRepository.save(newMessage);
  }
}