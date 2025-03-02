import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/moive.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {
  }

  getManyMovies(title: string) {
    // TODO : title filter 추가
    return this.movieRepository.find();
    // if (!title) {
    //   return this.movies;
    // }
    // return this.movies.filter((m) => m.title.startsWith(title));
  }

  async getMovieById(id: number) {
    // movies에 param에 입력한 값과 같은 id가 있는가?
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const movie = await this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    await this.movieRepository.update(id, updateMovieDto);
    return this.getMovieById(id);
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    
    await this.movieRepository.delete(id);

    return id;
  }
}
