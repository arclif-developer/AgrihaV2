import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Product } from './product.schema';
import { Project } from './projects.schema';

export type SuggestedProductDocument = SuggestedProduct & Document;

@Schema({ timestamps: true })
export class SuggestedProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project_id: Project;

  @Prop({
    type: [
      {
        facitlity_name: String,
        products: { type: [mongoose.Schema.Types.ObjectId], ref: Product },
      },
    ],
  })
  @Type(() => Product)
  products_per_facility: {
    facitlity_name: string;
    products: Product[];
  }; // add products for each facilities
}

const SuggestedProductSchema = SchemaFactory.createForClass(SuggestedProduct);

SuggestedProductSchema.index({ '$**': 'text' });

export { SuggestedProductSchema };
