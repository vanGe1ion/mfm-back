import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save({ ...createUserDto });
  }
}
