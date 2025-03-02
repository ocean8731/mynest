import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
@UseInterceptors(ClassSerializerInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  // @Query : Query Parameter
  getMovies(@Query('title') title: string) {
    return this.moviesService.getManyMovies(title);
  }

  @Get(':id')
  getMovie(@Param('id') id: number) {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  postMovie(@Body() body: CreateMovieDto) {
    return this.moviesService.createMovie(body);
  }

  @Patch(':id')
  patchMovie(@Param('id') id: number, @Body() body: UpdateMovieDto) {
    return this.moviesService.updateMovie(id, body);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteMovie(id);
  }
}
