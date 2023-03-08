import { Transform, Type } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { architects } from './architects.schema';
import { Product } from './product.schema';
import { User } from './userSchema';

export type addressDocument = address & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class address {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user_id: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pincode: Number;

  // @Prop({ required: true })
  // state: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  type_of_address: string;

  @Prop()
  landmark: string;

  @Prop()
  phone: string;

  @Prop()
  alternative_phone: string;
}
export const addressSchema = SchemaFactory.createForClass(address);
