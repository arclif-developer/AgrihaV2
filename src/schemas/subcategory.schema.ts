import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { Category } from './category.schema';

export type subcategoryDocument = subcategory & Document;

@Schema({ timestamps: true })
export class subcategory {
  @Prop({ required: true, type: String })
  subCategory_name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  @Type(() => Category)
  category_id: Category;
}

export const subcategorySchema = SchemaFactory.createForClass(subcategory);
