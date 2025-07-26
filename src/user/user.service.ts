import { User, UserStatus } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { startOfYear } from 'date-fns';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async seed(): Promise<User[]> {
    const today = new Date();
    const startOf2025 = startOfYear(today);
    const totalSeeds = 200;

    const seeds = Array.from({ length: totalSeeds }, () => {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        status: faker.helpers.arrayElement(Object.values(UserStatus)),

        // signup date should be dates between beginning of 2025 to today
        signupDate: faker.date.between({
          from: startOf2025,
          to: today,
        }),
      };

      return user;
    });

    return this.model.insertMany(seeds);
  }

  async getRandom() {
    const randomRecords = await this.model.aggregate([
      { $sample: { size: 1 } },
    ]);

    return randomRecords[0];
  }
}
