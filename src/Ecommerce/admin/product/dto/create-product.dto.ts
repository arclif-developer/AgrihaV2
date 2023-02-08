import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  category_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  subcategory_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  mrp: number;

  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsArray()
  @IsNotEmpty()
  image: [];

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  description;

  @IsNumber()
  discount_rate: any;

  @IsNotEmpty()
  hashtags: [];

  @IsNumber()
  @IsNotEmpty()
  stock_qty: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  volume: number;
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  category_name: string;
}

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  subCategory_name: string;
}

export class CreateSub_SubCategoryDto {
  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  sub_subname: string;

  @IsString()
  @IsNotEmpty()
  subcategory_id: string;
}
