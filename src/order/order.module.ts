import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '@/order/entities/order.entity';
import { OrderController } from '@/order/order.controller';
import { OrderService } from '@/order/order.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        useFactory: async () => {
          const schema = OrderSchema;

          return schema;
        },
      },
    ]),
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
