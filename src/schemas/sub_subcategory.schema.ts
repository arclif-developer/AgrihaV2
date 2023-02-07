import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { Category } from './category.schema';
import { subcategory } from './subcategory.schema';

export type sub_subcategoryDocument = sub_subcategory & Document;

@Schema({ timestamps: true })
export class sub_subcategory {
  @Prop({ required: true, type: String })
  sub_subname: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  @Type(() => Category)
  category_id: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: subcategory.name })
  @Type(() => subcategory)
  subcategory_id: subcategory;
}

export const sub_subcategorySchema =
  SchemaFactory.createForClass(sub_subcategory);
