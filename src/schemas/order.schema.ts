import { Transform, Type } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { architects } from './architects.schema';
import { Product } from './product.schema';
import { User } from './userSchema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  @Type(() => Product)
  product_id: Product;

  @Prop()
  razorpay_order_id: string;

  @Prop()
  razorpay_payment_id: string;

  @Prop()
  status: string;

  @Prop()
  captured: Boolean = false;

  @Prop()
  method: string;

  @Prop()
  amount: string;

  @Prop()
  acquirer_data: [];

  createdAt?: boolean | string;
  updatedAt?: boolean | string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
