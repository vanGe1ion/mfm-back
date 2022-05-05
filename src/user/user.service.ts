import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genre/genre.entity';
import { GenreService } from 'src/genre/genre.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private genreService: GenreService,
  ) {}

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save({ ...createUserDto });
  }

  async getGenres(userId: number): Promise<Genre[]> {
    return this.genreService.getGenresOfUser(userId);
  }
}
