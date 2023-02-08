import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Product } from './product.schema';
import { Project } from './projects.schema';

export type suggestProductDocument = suggestProduct & Document;

@Schema({ timestamps: true })
export class suggestProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project_id: Project;

  @Prop({ type: String })
  facility_name: string;

  @Prop({ type: String })
  phase: string;

  @Prop({ type: Boolean, default: false })
  realese: Boolean;

  @Prop({
    type: [
      {
        select: { type: Boolean, default: false },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Product.name,
        },
      },
    ],
  })
  @Type(() => Product)
  products: {
    productId: Product;
  };
}

const suggestProductSchema = SchemaFactory.createForClass(suggestProduct);

suggestProductSchema.index({ '$**': 'text' });

export { suggestProductSchema };
