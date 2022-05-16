import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AddMovieDto from './dto/add-movie.dto';
import UpdateMovieDto from './dto/update-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async addMovie(userId: number, addMovieDto: AddMovieDto): Promise<Movie> {
    return await this.movieRepository.save({ ...addMovieDto, userId });
  }

  async removeMovie(userId: number, movieId: number): Promise<number> {
    const { id } = await this.movieRepository.findOneOrFail({
      userId,
      movieId,
    });
    await this.movieRepository.delete({ id });
    return id;
  }

  async updateMovie(userId: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const { movieId } = updateMovieDto;
    await this.movieRepository.update({ movieId, userId }, updateMovieDto);
    return await this.movieRepository.findOneOrFail({ movieId, userId });
  }

  async getMoviesOfUser(userId: number): Promise<Movie[]> {
    return await this.movieRepository.find({
      where: { userId },
      order: { movieId: 'ASC' },
    });
  }
}
