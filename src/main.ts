import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MorganLogger } from './config/logger/morgan.logger';
import { TimeoutInterceptor } from './config/interceptor/timeout.interceptor';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ApplicationExceptionFilter } from './config/filter/application.exception.filter';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  setMiddlewares(app);
  await app.listen(PORT);
}

function setMiddlewares(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new ApplicationExceptionFilter());
  MorganLogger.setupMorgan(app);
}

bootstrap().then();
