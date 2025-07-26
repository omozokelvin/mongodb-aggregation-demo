import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({
    trim: true,
    required: true,
  })
  fullName: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    email: true,
    index: true,
  })
  email: string;

  @Exclude()
  @ApiHideProperty()
  @Prop({
    select: false,
  })
  password: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
