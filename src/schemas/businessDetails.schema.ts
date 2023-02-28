import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { register } from './register.schema';

export type businessDocument = business & Document;

@Schema({ timestamps: true })
export class business {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: register.name,
    required: true,
  })
  @Type(() => register)
  registered_id: register;

  @Prop({
    lowercase: true,
    index: true,
    sparse: true,
    default: null,
  })
  business_name: string;

  @Prop({
    lowercase: true,
    index: true,
    sparse: true,
    default: null,
  })
  business_type: string;

  @Prop({
    lowercase: true,
    index: true,
    sparse: true,
    default: null,
  })
  foundYear: string;
}

const businessSchema = SchemaFactory.createForClass(business);

businessSchema.index({ title: 'text' });

export { businessSchema };
