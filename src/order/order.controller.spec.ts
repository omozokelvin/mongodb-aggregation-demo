import { OrderController } from '@/order/order.controller';
import { OrderService } from '@/order/order.service';
import { Test, TestingModule } from '@nestjs/testing';

describe(OrderController.name, () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
