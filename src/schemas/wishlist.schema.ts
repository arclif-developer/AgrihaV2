import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Product } from './product.schema';
import { User } from './userSchema';

export type wishlistDocument = wishlist & Document;

@Schema({ timestamps: true })
export class wishlist {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  @Type(() => Product)
  product_id: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user_id: User;

  @Prop()
  status: string;

  @Prop({ default: false })
  cart_status: Boolean;
}

export const wishlistSchema = SchemaFactory.createForClass(wishlist);
