import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { GenreModule } from 'src/genre/genre.module';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GenreModule, MovieModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
