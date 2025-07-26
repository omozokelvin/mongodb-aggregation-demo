import { EnvironmentEnum } from '@/_lib/enums/environment.enum';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app) {
  const environment = process.env.NODE_ENV as EnvironmentEnum;

  if (environment !== EnvironmentEnum.PROD) {
    const config = new DocumentBuilder()
      .setTitle('MongoDB Aggregation Pipeline')
      .setDescription('The MongoDB Aggregation Pipeline API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
  }
}
