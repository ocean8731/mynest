import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';

// 기준에 맞게 IOC 컨테이너가 인스턴스화
@Module({
  imports: [MovieModule],
})
export class AppModule {}
