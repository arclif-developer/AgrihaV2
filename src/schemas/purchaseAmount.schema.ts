import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from './userSchema';

export type purchaseAmountDocument = purchaseAmount & Document;

@Schema({ timestamps: true })
export class purchaseAmount {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user_id: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  seller_id: User;

  @Prop({ default: 0 })
  amount: Number;
}

export const purchaseAmountSchema =
  SchemaFactory.createForClass(purchaseAmount);
