import { NestFactory } from '@nestjs/core';

import { applyGlobalPipelines, AppModule } from './app';

async function bootstrap() {
  const module = await AppModule.forRootAsync();

  let app = await NestFactory.create(module, { bufferLogs: true });
  app = await applyGlobalPipelines(app);

  await app.listen(8080);
}

bootstrap();
