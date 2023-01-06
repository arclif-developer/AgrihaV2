import { Transform, Type } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { architects } from './architects.schema';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: architects.name })
  @Type(() => architects)
  architect_id: architects;

  @Prop()
  mode_of_payment: string; //online or cash on hand

  @Prop()
  type_of_transaction: string; //gpay,UPI id,QR,Account details

  @Prop()
  details: string; //description

  createdAt?: boolean | string;
  updatedAt?: boolean | string;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
