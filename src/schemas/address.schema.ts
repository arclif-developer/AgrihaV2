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

  @Prop()
  pincode: string;

  @Prop()
  secondary_number: string;

  @Prop()
  delivery_address: string;
}
export const addressSchema = SchemaFactory.createForClass(address);
