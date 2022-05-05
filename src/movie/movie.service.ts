import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateMovieDto from './dto/create-movie.dto';
import RemoveMovieDto from './dto/remove-movie.dto';
import UpdateMovieDto from './dto/update-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieRepository.save({ ...createMovieDto });
  }

  async removeMovie(removeMovieDto: RemoveMovieDto): Promise<number> {
    const id = (await this.movieRepository.findOneOrFail({ ...removeMovieDto })).id;
    await this.movieRepository.delete({ id });
    return id;
  }

  async getMoviesOfUser(userId: number): Promise<Movie[]> {
    return await this.movieRepository.find({ userId });
  }

  async updateMovie(updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const { movieId, userId } = updateMovieDto;
    await this.movieRepository.update(
      { movieId, userId },
      { ...updateMovieDto },
    );
    return await this.movieRepository.findOneOrFail({ movieId, userId });
  }
}
