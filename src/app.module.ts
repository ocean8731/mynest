import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';

// 중앙 모듈 역할
@Module({
  imports: [MoviesModule],
})
export class AppModule {}
