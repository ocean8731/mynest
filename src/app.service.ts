import { Injectable, NotFoundException } from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
}

// IOC 컨테이너에게 어떤 클래스를 사용할지 알려주는 역할
@Injectable()
export class AppService {
  private movies: Movie[] = [ {
    id : 1,
    title : "a",
  }, {
    id : 2,
    title : "b",
  }
  ]
  private idCounter = 3;

  getManyMovies(title?: string){
    if(!title) {
      return this.movies;
    }
    return this.movies.filter( m => m.title.startsWith(title));
  }

  getMovieById(id : number) {
    const movie = this.movies.find((m)=> m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }

  createMovie(title : string) {
    const movie: Movie = {
      id: this.idCounter++,
      title: title
    };

    this.movies.push(
      movie
    )

    return movie;
  }

  updateMovie(id : number, title : string) {
    const movie = this.movies.find((m)=> m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    Object.assign(movie, {title});
    return movie;
  }

  deleteMovie(id : number) {
    const movieIndex = this.movies.findIndex((m)=> m.id === +id);

    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    this.movies.splice(movieIndex, 1)

    return id;
  }
}
