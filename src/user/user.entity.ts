import { Genre } from 'src/genre/genre.entity';
import { Movie } from 'src/movie/movie.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Genre, (genre) => genre.user, {
    cascade: true,
  })
  genres: Genre[];

  @OneToMany(() => Movie, (movie) => movie.user, {
    cascade: true,
  })
  movies: Movie[];
}
