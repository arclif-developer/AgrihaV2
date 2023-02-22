import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateProductDto {
  @ApiProperty({ example: 'category_id', required: true })
  @IsString()
  @IsNotEmpty()
  category_id: ObjectId;

  @ApiProperty({ example: 'subcategory_id', required: true })
  @IsString()
  @IsNotEmpty()
  subcategory_id: ObjectId;

  @ApiProperty({ example: 'seller_id', required: true })
  @IsString()
  @IsNotEmpty()
  seller_id: ObjectId;

  @ApiProperty({ example: 'name => type :  string', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Manufacture by => type :  string' })
  @IsString()
  manufactered_by: string;

  @ApiProperty({ example: 'sku => type : string' })
  @IsString()
  sku: string;

  @ApiProperty({ example: 'tax => type  : number' })
  @IsNumber()
  tax: number;

  @ApiProperty({ example: 'GST => type  : number', required: true })
  @IsNumber()
  @IsNotEmpty()
  gst: number;

  @ApiProperty({ example: 'brand  => type : string' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'color => type : Array' })
  @IsArray()
  color: [];

  @ApiProperty({ example: 'material_type', required: true })
  @IsString()
  material_type: string;

  @ApiProperty({ example: 'model' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'offers' })
  @IsString()
  offers: string;

  @ApiProperty({ example: 'size' })
  @IsString()
  size: string;

  @ApiProperty({ example: 'width' })
  @IsString()
  width: string;

  @ApiProperty({ example: 'mrp', required: true })
  @IsNumber()
  @IsNotEmpty()
  mrp: number;

  @ApiProperty({ example: 'productCode' })
  @IsString()
  productCode: string;

  @ApiProperty({ example: 'production_date' })
  @IsString()
  production_date: string;

  @ApiProperty({ example: 'image => type:Array', required: true })
  @IsArray()
  @IsNotEmpty()
  image: [];

  @ApiProperty({ example: 'thumbnail', required: true })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({ example: 'description', required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'discount_rate' })
  @IsNumber()
  discount_rate: any;

  @ApiProperty({ example: 'hashtags', required: true })
  @IsNotEmpty()
  hashtags: [];

  @ApiProperty({ example: 'stock_qty', required: true })
  @IsNumber()
  @IsNotEmpty()
  stock_qty: number;

  @ApiProperty({ example: 'weight' })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 'volume' })
  @IsNumber()
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
