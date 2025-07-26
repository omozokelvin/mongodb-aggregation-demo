import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '@/user/entities/user.entity';

export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  APPAREL = 'Apparel',
  HOME_AND_KITCHEN = 'Home & Kitchen',
  HEALTH_AND_BEAUTY = 'Health & Beauty',
  BOOKS = 'Books',
  SPORTS_AND_OUTDOORS = 'Sports & Outdoors',
  TOYS_AND_GAMES = 'Toys & Games',
  AUTOMOTIVE = 'Automotive',
  GROCERY = 'Grocery',
  PET_SUPPLIES = 'Pet Supplies',
}

@Schema()
export class Order {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
    index: true,
  })
  customer: User;

  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({
    required: true,
    enum: Object.values(ProductCategory),
  })
  productCategory: ProductCategory;

  @Prop({
    required: true,
  })
  orderDate: Date;
}

export type OrderDocument = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);
