import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    example: 'Floki',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 678597,
    required: true,
  })
  @IsNumber()
  pincode: Number;

  @ApiProperty({
    example: 'kozhikode',
    required: true,
  })
  @IsString()
  district: string;

  @ApiProperty({
    example: 'palakkad',
    required: true,
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'karimba',
    required: true,
  })
  @IsString()
  location: string;

  @ApiProperty({
    example: 'shop /mall',
    required: true,
  })
  @IsString()
  landmark: string;

  @ApiProperty({
    example: '9809261209',
    required: true,
  })
  @IsString()
  alternative_phone: string;

  @ApiProperty({
    example: 'home/worksite',
    required: true,
  })
  @IsString()
  type_of_address: string;

  @ApiProperty({
    example: '9605725894',
    required: true,
  })
  @IsString()
  phone: string;

  @IsString()
  user_id: string;

  @ApiProperty({
    example: 'Address',
    required: true,
  })
  @IsString()
  address: string;
}
