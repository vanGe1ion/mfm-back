import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiGenre } from './object-types';
import axios from 'axios';

@Injectable()
export class ApiService {
  constructor(private configService: ConfigService) {}

  private movieDBClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
      api_key: this.configService.get<string>('TMDB_API_KEY'),
      language: 'en-EN',
    },
  });

  async getGenres(): Promise<ApiGenre[]> {
    const response = await this.movieDBClient.get('/genre/movie/list');
    return await response.data.genres;
  }
}
