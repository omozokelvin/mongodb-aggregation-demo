import { OrderService } from '@/order/order.service';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Order Collection')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/seed')
  seed() {
    return this.orderService.seed();
  }
}
