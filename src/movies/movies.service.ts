import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/moives.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';
import { MovieDetail } from './entity/movies-detail.entity';

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private movieDetailRepository: Repository<MovieDetail>,
  ) {
  }

  async getManyMovies(title?: string) {
    if (!title) {
      return [
        await this.movieRepository.find(), 
        await this.movieRepository.count()
      ];
    }
    return this.movieRepository.findAndCount({
      where: {
        title: Like(`${title}%`),
      },
      relations: ['detail']
    });
  }

  async getMovieById(id: number) {
    // movies에 param에 입력한 값과 같은 id가 있는가?
    const movie = await this.movieRepository.findOne({ 
      where: { id },
      relations: ['detail']
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.create({ 
      title : createMovieDto.title, 
      genre : createMovieDto.genre,
      detail: {
        detail: createMovieDto.detail
      } 
    });
    return this.movieRepository.save(movie);
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ 
      where: { id },
      relations: ['detail']
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    const {detail, ...movieRest} = updateMovieDto;
    await this.movieRepository.update(
      {id}, 
      movieRest
    );
    if (detail) {
      await this.movieDetailRepository.update(
        {
          id: movie.detail.id
        },
        {
          detail
        }    
      );
    }
    const newMovie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail']
    });
    return newMovie;
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({ 
      where: { id },
      relations: ['detail']
    });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    
    await this.movieRepository.delete(id);
    await this.movieDetailRepository.delete(movie.detail.id);

    return id;
  }
}
