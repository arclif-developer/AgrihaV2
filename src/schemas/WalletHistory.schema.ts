import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from './userSchema';

export type WalletHistoryDocument = WalletHistory & Document;

@Schema({ timestamps: true })
export class WalletHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user_id: User;

  @Prop()
  balance: Number;
}

export const WalletHistorySchema = SchemaFactory.createForClass(WalletHistory);
