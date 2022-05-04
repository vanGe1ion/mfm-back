import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('movie')
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  movieId: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  originalTitle: string;

  @Column()
  releaseYear: number;

  @Column()
  overview: string;

  @Column()
  posterPath: string;

  @Column()
  voteCount: number;

  @Column()
  voteAverage: number;

  @Column('int', { array: true })
  genreIds: number[];

  @Column({ default: false })
  isViewed: boolean;

  @ManyToOne(() => User, (user) => user.movies)
  user: User;
}
