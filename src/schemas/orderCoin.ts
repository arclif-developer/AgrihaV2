import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from './userSchema';

export type orderCoinDocument = orderCoin & Document;

@Schema({ timestamps: true })
export class orderCoin {
  @Prop()
  razorpay_order_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Type(() => User)
  user_id: User;

  @Prop()
  razorpay_payment_id: string;

  @Prop()
  status: string;

  @Prop()
  role: string;

  @Prop()
  payment_method: string;

  @Prop()
  captured: Boolean = false;

  @Prop()
  amount: Number;
}

export const orderCoinSchema = SchemaFactory.createForClass(orderCoin);
