import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResolver } from './api.resolver';
import { GenreModule } from 'src/genre/genre.module';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports:[GenreModule, MovieModule],
  providers: [ApiService, ApiResolver],
})
export class ApiModule {}
