import { Order, ProductCategory } from '@/order/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { startOfYear } from 'date-fns';
import { UserService } from '@/user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<Order>,
    private readonly userService: UserService
  ) {}

  async seed(): Promise<Order[]> {
    const today = new Date();
    const startOf2025 = startOfYear(today);
    const totalSeeds = 200;

    const seeds: Order[] = [];

    for (let i = 0; i < totalSeeds; i++) {
      const user = await this.userService.getRandom();

      const order: Order = {
        customer: user._id,
        amount: faker.number.int({ min: 1000, max: 100000 }),
        productCategory: faker.helpers.arrayElement(
          Object.values(ProductCategory)
        ),
        orderDate: faker.date.between({
          from: startOf2025,
          to: today,
        }),
      };

      seeds.push(order);
    }

    return this.model.insertMany(seeds);
  }
}
