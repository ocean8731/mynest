import { Injectable, NotFoundException } from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
}
// 실제적인 논리를 실행하는 부분
@Injectable()
export class AppService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'a',
    },
    {
      id: 2,
      title: 'b',
    },
  ];
  private idCounter = 3;

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

  createMovie(title: string) {
    const movie: Movie = {
      id: this.idCounter++,
      title: title,
    };

    this.movies.push(movie);

    return movie;
  }

  patchMovie(id: string, title: string) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    Object.assign(movie, { title });
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
