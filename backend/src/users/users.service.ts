import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(user: Partial<User>): Promise<User> {
    // التحقق من وجود كلمة المرور
    if (!user.password) {
      throw new BadRequestException('Password is required');
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // إنشاء كائن المستخدم
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    // حفظ المستخدم
    return this.usersRepository.save(newUser);
  }
}