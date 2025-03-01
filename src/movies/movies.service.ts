import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/moive.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  private idCounter = 3;

  constructor() {
    const movie1 = new Movie();
    movie1.id = 1;
    movie1.title = 'a';
    movie1.genre = '판타지';

    const movie2 = new Movie();
    movie2.id = 2;
    movie2.title = 'b';
    movie2.genre = '액션';

    this.movies.push(movie1, movie2);
  }

  getManyMovies(title: string) {
    if (!title) {
      return this.movies;
    }
    return this.movies.filter((m) => m.title.startsWith(title));
  }

  getMovieById(id: string) {
    // movies에 param에 입력한 값과 같은 id가 있는가?
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  createMovie(createMovieDto: CreateMovieDto) {
    const movie: Movie = {
      id: this.idCounter++,
      ...createMovieDto,
      // 임시 데이터
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 0,
    };

    this.movies.push(movie);

    return movie;
  }

  patchMovie(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    Object.assign(movie, updateMovieDto);
    return movie;
  }

  deleteMovie(id: string) {
    const movieIndex = this.movies.findIndex((m) => m.id === +id);

    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    this.movies.splice(movieIndex, 1);

    return id;
  }
}
