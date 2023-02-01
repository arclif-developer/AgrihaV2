import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { register } from './register.schema';

export type ReferralDocument = Referral & Document;

@Schema({ timestamps: true })
export class Referral {
  @Prop({ type: String })
  owner: string;

  @Prop({ type: String })
  referralCode: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: register.name }])
  @Type(() => register)
  users: register;
}

const ReferralSchema = SchemaFactory.createForClass(Referral);

ReferralSchema.index({ '$**': 'text' });

export { ReferralSchema };
