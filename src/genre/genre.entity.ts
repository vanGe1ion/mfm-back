import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('genre')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genreId: number;

  @ManyToOne(() => User, (user) => user.genres)
  user: User;
}
