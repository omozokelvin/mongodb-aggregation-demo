import { setupSwagger } from '@/_lib/config/swagger.config';
import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(process.env.PORT!);
}
bootstrap();
