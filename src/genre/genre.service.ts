import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddGenreDto } from './dto/add-genre.dto';
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

  async addGenre(addGenreDto: AddGenreDto): Promise<Genre> {
    return await this.genreRepository.save(addGenreDto);
  }

  async removeGenre(removeGenreDto: RemoveGenreDto): Promise<number> {
    const genre = await this.genreRepository.findOneOrFail(removeGenreDto);
    const { id } = genre;
    await this.genreRepository.delete({ id });
    return id;
  }
}
