import { Prop, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Project } from './projects.schema';

export type SuggestedProductDocument = SuggestedProduct & Document;

@Schema({ timestamps: true })
export class SuggestedProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  @Type(() => Project)
  project_id: Project;
}
