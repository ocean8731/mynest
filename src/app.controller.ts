import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
}

@Controller('movie')
export class AppController {
  private movies: Movie[] = [ {
    id : 1,
    title : "a",
  }, {
      id : 2,
      title : "b",
    }
  ]
  private idCounter = 3;
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Query : Query Parameter
  getMovies(@Query('title')title: string){
    if(!title) {
      return this.movies;
    }
    return this.movies.filter( m => m.title.startsWith(title));
  }
  @Get(':id')
  getMovie(@Param('id') id: string){
    // movies에 param에 입력한 값과 같은 id가 있는가?
    const movie = this.movies.find((m)=> m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }

    return movie;
  }
  @Post()
  postMovie(
    @Body('title') title: string,
  ) {
    const movie: Movie = {
      id: this.idCounter++,
      title: title
    };

    this.movies.push(
      movie
    )

    return movie;
  }
  @Patch(':id')
  patchMovie(
    @Param('id') id: string,
    @Body('title') title: string,
    ) {
    const movie = this.movies.find((m)=> m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    Object.assign(movie, {title});
    return movie;
  }
  @Delete(':id')
  deleteMovie(
    @Param('id') id: string,
  ){
    const movieIndex = this.movies.findIndex((m)=> m.id === +id);

    if (movieIndex === -1) {
      throw new NotFoundException('존재하지 않는 영화입니다.');
    }
    this.movies.splice(movieIndex, 1)

    return id;
  }
}
