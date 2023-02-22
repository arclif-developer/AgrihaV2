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

  @ApiProperty({ example: 'Manufacture by => type :  string', required: true })
  @IsString()
  @IsNotEmpty()
  manufactered_by: string;

  @ApiProperty({ example: 'sku => type : string', required: true })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 'tax => type  : number', required: true })
  @IsNumber()
  @IsNotEmpty()
  tax: number;

  @ApiProperty({ example: 'GST => type  : number', required: true })
  @IsNumber()
  @IsNotEmpty()
  gst: number;

  @ApiProperty({ example: 'brand  => type : string', required: true })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'color => type : Array', required: true })
  @IsArray()
  color: [];

  @ApiProperty({ example: 'material_type', required: true })
  @IsString()
  material_type: string;

  @ApiProperty({ example: 'model', required: true })
  @IsString()
  model: string;

  @ApiProperty({ example: 'offers', required: true })
  @IsString()
  offers: string;

  @ApiProperty({ example: 'size', required: true })
  @IsString()
  size: string;

  @ApiProperty({ example: 'width', required: true })
  @IsString()
  width: string;

  @ApiProperty({ example: 'mrp', required: true })
  @IsNumber()
  @IsNotEmpty()
  mrp: number;

  @ApiProperty({ example: 'productCode', required: true })
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @ApiProperty({ example: 'production_date', required: true })
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

  @ApiProperty({ example: 'discount_rate', required: true })
  @IsNumber()
  discount_rate: any;

  @ApiProperty({ example: 'hashtags', required: true })
  @IsNotEmpty()
  hashtags: [];

  @ApiProperty({ example: 'stock_qty', required: true })
  @IsNumber()
  @IsNotEmpty()
  stock_qty: number;

  @ApiProperty({ example: 'weight', required: true })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 'volume', required: true })
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
