import { Transform, Type } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { address } from './address.schema';
import { architects } from './architects.schema';
import { Product } from './product.schema';
import { User } from './userSchema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Type(() => User)
  user_id: User;

  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
    required: true,
  }])
  @Type(() => Product)
  product_id: Product;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: address.name,
    required: true,
  })
  @Type(() => address)
  address_id: address;

  @Prop()
  razorpay_order_id: string;

  @Prop()
  razorpay_payment_id: string;

  @Prop()
  status: string;

  @Prop()
  captured: Boolean = false;

  @Prop()
  amount: Number;

  @Prop()
  delivery_status: string;

  createdAt?: boolean | string;
  updatedAt?: boolean | string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
