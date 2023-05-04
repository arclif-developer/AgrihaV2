import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ example: 'CONFIRMED', required: false })
  delivery_status?: string;
  @ApiProperty({ example: '3/5/2023' })
  delivery_date: Date;
}
