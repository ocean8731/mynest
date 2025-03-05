import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, VersionColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MovieDetail } from './movies-detail.entity';

/**
 * ManyToMany : Genre
 * ManyToOne : Director
 * OneToOne : MovieDetail
 */

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @OneToOne(() => MovieDetail)
  @JoinColumn()
  detail: MovieDetail;

}
