import { AppModule } from './app.module';
import { HttpExceptionFilter, isMockMode, isReportMode } from './utils';
import { ILogger } from './logger';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

if (isMockMode() || isReportMode()) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: new ILogger(),
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());

    app.enableCors();
    app.use(helmet());

    await app.listen(process.env.PORT || 3000);
  }
  bootstrap();
} else {
  async function bootstrap() {
    await NestFactory.createApplicationContext(AppModule);
  }
  bootstrap();
}
