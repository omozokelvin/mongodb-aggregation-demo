import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/entities/user.entity';
import { genSalt, hashSync } from 'bcryptjs';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async () => {
          const schema = UserSchema;

          schema.pre('save', async function () {
            if (this.isModified('password')) {
              const salt = await genSalt(10);
              const hash = await hashSync(this.password, salt);
              this.password = hash;
            }
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
