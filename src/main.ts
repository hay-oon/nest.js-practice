import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3030;

  await app.listen(port);
  logger.log(`Server is running on port ${port}`);
}
bootstrap();
