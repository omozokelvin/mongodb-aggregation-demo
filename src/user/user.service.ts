import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public model: Model<User>) {}

  seed() {
    // seed 10000 users with faker

    const seeds = Array.from({ length: 10000 }, () => {
      const user = {
        fullName: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      return user;
    });

    return this.model.insertMany(seeds);
  }
}
