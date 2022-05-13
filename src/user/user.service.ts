import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genre/genre.entity';
import { GenreService } from 'src/genre/genre.service';
import { Movie } from 'src/movie/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import SignInUserDto from './dto/sign-in-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private genreService: GenreService,
    private movieService: MovieService,
  ) {}

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  async signInUser(signInUserDto: SignInUserDto): Promise<User> {
    return await this.userRepository.findOneOrFail(signInUserDto);
  }

  async getUserByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save({ ...createUserDto });
  }

  async getGenres(userId: number): Promise<Genre[]> {
    return await this.genreService.getGenresOfUser(userId);
  }

  async getMovies(userId: number): Promise<Movie[]> {
    return await this.movieService.getMoviesOfUser(userId);
  }
}
