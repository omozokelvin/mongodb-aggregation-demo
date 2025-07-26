import {
  EnvironmentVariables,
  validateEnv,
} from '@/_lib/validations/environment.validation';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from '@/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),

    MongooseModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>
      ) => {
        const uri = configService.get('MONGO_DATABASE_URI', { infer: true });

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
