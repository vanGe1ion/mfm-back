import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, MovieResolver],
  exports:[MovieService]
})
export class MovieModule {}
