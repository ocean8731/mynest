import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  // @Query : Query Parameter
  getMovies(@Query('title') title: string) {
    return this.moviesService.getManyMovies(title);
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  postMovie(@Body('title') title: string) {
    return this.moviesService.createMovie(title);
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body('title') title: string) {
    return this.moviesService.patchMovie(id, title);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(id);
  }
}
