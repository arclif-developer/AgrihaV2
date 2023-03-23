import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from './userSchema';

export type coinCreditHistoryDocument = coinCreditHistory & Document;

@Schema({ timestamps: true })
export class coinCreditHistory {
  @Prop({ type: Boolean })
  admin: Boolean;

  @Prop({ type: Number })
  coinAmount: Number;

  @Prop({ type: Date, default: Date.now })
  transactionDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  sender: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  recipient: User;
}

export const coinCreditHistorySchema =
  SchemaFactory.createForClass(coinCreditHistory);
