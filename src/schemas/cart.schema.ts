import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Product } from './product.schema';
import { User } from './userSchema';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  @Type(() => Product)
  product_id: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user_id: User;

  @Prop({ default: 1 })
  quantity: Number;

  @Prop({ default: false })
  whishlist: Boolean;

  @Prop({ default: true })
  cart: Boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
