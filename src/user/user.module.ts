import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { GenreModule } from 'src/genre/genre.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GenreModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
