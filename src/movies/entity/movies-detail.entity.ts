import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Movie } from "./moives.entity";

@Entity()
export class MovieDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @OneToOne(() => Movie, (movie) => movie.detail, {
    onDelete: 'CASCADE'
  })
  movie: Movie;
} 