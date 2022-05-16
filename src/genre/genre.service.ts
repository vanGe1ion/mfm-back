import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) {}

  async addGenre(userId: number, genreId:number): Promise<Genre> {
    return await this.genreRepository.save({userId, genreId});
  }

  async removeGenre(userId: number, genreId:number): Promise<number> {
    const { id } = await this.genreRepository.findOneOrFail({userId, genreId});
    await this.genreRepository.delete({ id });
    return id;
  }

  async getGenresOfUser(userId: number): Promise<Genre[]> {
    return await this.genreRepository.find({ userId });
  }
}
