import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from './userSchema';

export type ReqProductsDocument = ReqProducts & Document;

@Schema({ timestamps: true })
export class ReqProducts {
  @Prop()
  image: string;

  @Prop()
  product_name: string;

  @Prop()
  product_category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;
}

export const ReqProductsSchema = SchemaFactory.createForClass(ReqProducts);
