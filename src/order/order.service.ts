import { Order, ProductCategory } from '@/order/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { faker } from '@faker-js/faker';
import { startOfYear } from 'date-fns';
import { UserService } from '@/user/user.service';
import {
  SingleGroup,
  GroupResponseDto,
  ProjectResponseDto,
  SingleProject,
  SortResponseDto,
} from '@/order/dto/order.dto';
import { PaginationRequestDto, SortRecord } from '@/_lib/dtos/pagination.dto';

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

  async group(): Promise<GroupResponseDto> {
    const pipeline = [
      {
        $group: {
          _id: '$productCategory',
          totalSales: { $sum: '$amount' },
          numberOfOrders: { $count: {} },
        },
      },
    ];

    const items = await this.model.aggregate<SingleGroup>(pipeline);
    const total = items.length;

    const meta = { total };

    return {
      items,
      meta,
    };
  }

  async project(query: PaginationRequestDto): Promise<ProjectResponseDto> {
    const { limit } = query;

    const pipeline = [
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'customer',
          foreignField: '_id',
          as: 'customer',
        },
      },
      { $unwind: { path: '$customer', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          customerName: '$customer.name',
          orderIdentifier: '$_id',
          formattedTotal: { $concat: ['USD ', { $toString: '$amount' }] },
        },
      },
    ];

    const items = await this.model.aggregate<SingleProject>(pipeline);
    const total = items.length;

    const meta = { total };

    return {
      items,
      meta,
    };
  }

  async sort(query: PaginationRequestDto): Promise<SortResponseDto> {
    const { limit } = query;

    const pipeline = [
      {
        $limit: limit,
      },
      {
        $sort: {
          amount: -1 satisfies SortOrder,
          orderDate: 1 satisfies SortOrder,
        } as SortRecord,
      },
    ];

    const items = await this.model.aggregate<Order>(pipeline);
    const total = items.length;

    const meta = { total };

    return {
      items,
      meta,
    };
  }
}
