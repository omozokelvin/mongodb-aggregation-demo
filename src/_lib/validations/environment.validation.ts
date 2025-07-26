import { EnvironmentEnum } from '@/_lib/enums/environment.enum';
import { plainToClass } from 'class-transformer';
import { IsInt, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  NODE_ENV: EnvironmentEnum;

  @IsInt()
  PORT: number;

  @IsString()
  MONGO_ROOT_USER: string;

  @IsString()
  MONGO_ROOT_PASSWORD: string;

  @IsString()
  MONGO_COLLECTION_NAME: string;

  @IsString()
  MONGO_DATABASE_URI: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
