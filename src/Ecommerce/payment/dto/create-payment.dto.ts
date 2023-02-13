import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'product amount', required: true })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'INR/...', required: true })
  @IsString()
  currency: string;
}
