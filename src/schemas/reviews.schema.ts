import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Product } from './product.schema';
import { User } from './userSchema';

export type reviewDocument = review & Document;

@Schema({ timestamps: true })
export class review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  @Type(() => Product)
  product_id: Product;

  @Prop()
  comment: string;

  @Prop()
  star_rate: number;
}

export const reviewSchema = SchemaFactory.createForClass(review);
