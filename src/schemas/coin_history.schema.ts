import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from './userSchema';

export type coinHistoryDocument = coinHistory & Document;

@Schema({ timestamps: true })
export class coinHistory {
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

export const coinHistorySchema = SchemaFactory.createForClass(coinHistory);
