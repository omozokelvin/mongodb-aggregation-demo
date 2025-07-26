import { PaginationRequestDto } from '@/_lib/dtos/pagination.dto';
import { OrderService } from '@/order/order.service';
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Order Collection')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/seed')
  seed() {
    return this.orderService.seed();
  }

  @Get('group')
  group() {
    return this.orderService.group();
  }

  @Get('project')
  project(@Query() query: PaginationRequestDto) {
    return this.orderService.project(query);
  }

  @Get('sort')
  sort(@Query() query: PaginationRequestDto) {
    return this.orderService.sort(query);
  }
}
