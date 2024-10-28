import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      // 실제로 정의하지 않은 값은 들어가지 않게 하는 옵션
      whitelist: true,
      // 정의하지 않은 값이 들어갔을 때 에러를 발생시키는 옵션
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
