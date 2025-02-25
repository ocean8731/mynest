import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// 중앙 모듈 역할
@Module({
  imports: [
    ConfigModule.forRoot({}),
    // supabase 이용 시에는 session puller 이용
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      // 개발서버에서만 켜놓자!
      synchronize: true,
    }),
    MoviesModule,
  ],
})
export class AppModule {}
