import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: '634e5330c5b0e4e57043e97b', required: true })
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({ example: 2, required: true })
  @IsNumber()
  quantity: number;
}
