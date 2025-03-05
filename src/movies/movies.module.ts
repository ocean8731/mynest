import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/moives.entity';  
import { MovieDetail } from './entity/movies-detail.entity';
@Module({
  imports: [TypeOrmModule.forFeature([
    Movie, 
    MovieDetail
  ])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
