import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpService } from '@nestjs/axios';
import { HttpExceptionFilter } from './http-exception.filter';
import { InternalServerErrorException } from '@nestjs/common';

async function bootstrap() {
  const httpService = new HttpService();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  httpService.axiosRef.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error('Internal server error exception', error);
      throw new InternalServerErrorException();
    },
  );

  await app.listen(3000);
}
bootstrap();
