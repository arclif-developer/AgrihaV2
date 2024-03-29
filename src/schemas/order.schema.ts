import { Transform, Type } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { Status } from '../models/Enums';
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

  @Prop({
    type: [
      {
        confirm: { type: Boolean, default: false },
        delivery_status: { type: String, default: Status.PROCESSING },
        admin: { type: Boolean },
        amount: { type: Number },
        productname: { type: String },
        delivery_date: { type: Date },
        quantity: { type: Number, default: 1 },
        seller_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: User.name,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Product.name,
          required: true,
        },
      },
    ],
  })
  @Type(() => Product)
  @Type(() => User)
  products: {
    productId: Product;
    delivery_status: string;
    quantity: Number;
    amount: Number;
    seller_id: User;
    admin: Boolean;
    productname: string;
    delivery_date: Date;
  };

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
  order_number: Number;

  @Prop()
  status: string;

  @Prop()
  payment_method: string;

  @Prop()
  role: string;

  @Prop()
  captured: Boolean = false;

  @Prop()
  amount: Number;

  @Prop()
  acquirer_data: [];

  createdAt?: boolean | string;
  updatedAt?: boolean | string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
