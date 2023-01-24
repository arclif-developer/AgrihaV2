import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './userSchema';
import { Type } from '@nestjs/class-transformer';
import { architects } from './architects.schema';
import { paymentplan_tb } from './paymentplan.schema';
import { Product } from './product.schema';
import { quotation } from './quotation.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: architects.name })
  @Type(() => architects)
  architect_id: architects;

  @Prop()
  project_type: string;

  @Prop()
  thumbnail: string;

  @Prop()
  view: string;

  @Prop()
  projectsub_type: string;

  @Prop()
  project_type_details: object[];

  @Prop()
  project_requirements: object[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: paymentplan_tb.name })
  @Type(() => paymentplan_tb)
  plan_id: paymentplan_tb;

  @Prop()
  plan_services: string[];

  @Prop()
  project_name: string;

  @Prop()
  starting_date: string;

  @Prop()
  ending_date: string;

  @Prop()
  status: string;

  @Prop()
  bid: boolean;

  @Prop()
  requirement_list: string[]; //libary,sitout

  @Prop()
  reference_images: string[];

  @Prop()
  site_plan: string;

  @Prop()
  secondary_details: object[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  issaved: User[];

  @Prop()
  acceptQuotes: [];

  @Prop()
  view_status: [];

  @Prop()
  facilities: string[];

  // @Prop({
  //   type: [
  //     {
  //       facility_name: String,
  //       products: [
  //         { type: mongoose.Schema.Types.ObjectId, ref: quotation.name },
  //       ],
  //     },
  //   ],
  // })
  // @Type(() => quotation)
  // products_per_facility: {
  //   facility_name: string;
  //   products: quotation;
  // }; // add products for each facilities
}

const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.index({ '$**': 'text' });

export { ProjectSchema };
