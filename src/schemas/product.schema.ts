import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Category } from './category.schema';
import { subcategory } from './subcategory.schema';

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

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  sku: string;

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
  hashtags: [];

  @Prop({ required: true })
  stock_qty: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  volume: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ '$**': 'text' });
