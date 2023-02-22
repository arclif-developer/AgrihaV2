import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreatePaymentDto {
  @ApiProperty({ example: 'Select delivery address _id', required: true })
  @IsMongoId()
  address_id: ObjectId;

  @ApiProperty({ example: 'Seller id', required: true })
  @IsMongoId()
  seller_id: ObjectId;

  @ApiProperty({ example: 'Product _id ', required: true })
  product_id: Object[];

  @ApiProperty({ example: 'product amount', required: true })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'INR/...', required: true })
  @IsString()
  currency: string;

  @ApiProperty({ example: 2, required: true })
  @IsNumber()
  quantity: Number;
}
