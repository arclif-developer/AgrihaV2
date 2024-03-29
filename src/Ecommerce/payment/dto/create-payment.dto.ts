import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreatePaymentDto {
  @ApiProperty({ example: 'Select delivery address _id', required: true })
  @IsMongoId()
  address_id: ObjectId;

  @ApiProperty({ example: 'Product _id ', required: true })
  product_id: Object[];

  @ApiProperty({ example: 'product amount', required: true })
  @IsString()
  amount: string;

  @ApiProperty({ example: 'INR/...', required: true })
  @IsString()
  currency: string;

  @ApiProperty({ example: 'online / cod', required: true })
  @IsString()
  payment_mode: string;
}
