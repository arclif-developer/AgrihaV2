import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Category } from './category.schema';
import { subcategory } from './subcategory.schema';
import { User } from './userSchema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  @Type(() => Category)
  category_id: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: subcategory.name,
    required: true,
  })
  @Type(() => subcategory)
  subcategory_id: subcategory;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  seller_id: User;

  @Prop({ required: true })
  name: string;

  @Prop()
  seller: string;

  @Prop()
  manufactered_by: string;

  @Prop({ required: true, unique: true })
  sku: string;

  @Prop()
  tax: Number;

  @Prop()
  gst: Number;

  @Prop()
  brand: string;

  @Prop()
  video: string;

  @Prop()
  color: [];

  @Prop()
  material_type: string;

  @Prop()
  model: string;

  @Prop()
  offers: string;

  @Prop()
  size: string;

  @Prop()
  width: string;

  @Prop()
  production_date: string;

  @Prop()
  height: string;

  @Prop()
  length: number;

  @Prop({ required: true })
  mrp: number;

  @Prop({ required: true, unique: true })
  productCode: string;

  @Prop({ required: true })
  image: [];

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  discount_rate: number;

  @Prop({ required: true })
  hashtags: string;

  @Prop({ required: true })
  stock_qty: number;

  @Prop()
  weight: number;

  @Prop()
  unit: string;

  @Prop()
  volume: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ '$**': 'text' });
