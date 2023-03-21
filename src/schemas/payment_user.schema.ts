import { Transform, Type } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Payment } from './payment.schema';
import { Project } from './projects.schema';

import { User } from './userSchema';

export type Payment_userDocument = Payment_user & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Payment_user {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project_id: Project;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Payment.name })
  @Type(() => Payment)
  payment_id: Payment;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;

  @Prop()
  status: string; //pending,paid

  @Prop()
  total_amount: Number;

  @Prop()
  balance: Number;

  @Prop()
  amount_tobe_paid: Number;

  @Prop()
  transaction_image: string;

  @Prop()
  due_date: Date;

  @Prop()
  bill_date: Date;

  @Prop()
  mode_of_payment: string;

  @Prop()
  amount: number;

  @Prop()
  transaction_id: string; //gpay transaction id

  @Prop()
  stage: string; //advance,site visit

  createdAt?: boolean | string;
  updatedAt?: boolean | string;
}
export const Payment_userSchema = SchemaFactory.createForClass(Payment_user);
