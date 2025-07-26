import { User, UserStatus } from '@/user/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { faker } from '@faker-js/faker';
import { startOfYear } from 'date-fns';
import { MatchQueryDto, MatchResponseDto } from '@/user/dto/user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
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

  async match(query: MatchQueryDto): Promise<MatchResponseDto> {
    const { status, signupDate, limit, search } = query;

    this.logger.log({ status, signupDate, limit });

    const filter: FilterQuery<User> = {};

    if (status) {
      filter.status = status;
    }

    if (signupDate) {
      filter.signupDate = { $gte: signupDate };
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const pipeline: PipelineStage[] = [
      {
        $match: filter,
      },
      {
        $limit: limit,
      },
    ];

    if (search) {
      pipeline.push({ $addFields: { score: { $meta: 'textScore' } } });
      pipeline.push({ $sort: { score: { $meta: 'textScore' } } });
    }

    const items = await this.model.aggregate<User>(pipeline);
    const total = items.length;

    const meta = { total, limit };

    return {
      meta,
      items,
    };
  }
}
