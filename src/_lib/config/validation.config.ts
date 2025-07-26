import { EnvironmentEnum } from '@/_lib/enums/environment.enum';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function setupValidation(app) {
  const environment = process.env.NODE_ENV as EnvironmentEnum;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: environment === EnvironmentEnum.PROD,
      transform: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    })
  );
}
