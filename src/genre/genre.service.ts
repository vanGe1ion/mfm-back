import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { RemoveGenreDto } from './dto/remove-genre.dto';
import { Genre } from './genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  async getGenresOfUser(userId: number): Promise<Genre[]> {
    return await this.genreRepository.find({ userId });
  }

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.genreRepository.save({ ...createGenreDto });
  }

  async removeGenre(removeGenreDto: RemoveGenreDto): Promise<number> {
    const id = (await this.genreRepository.findOneOrFail({...removeGenreDto})).id;
    await this.genreRepository.delete({ id });
    return id;
  }
}
