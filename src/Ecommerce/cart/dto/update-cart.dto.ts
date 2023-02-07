import { IsNumber, IsString } from 'class-validator';

export class UpdateCartDto {
  @IsNumber()
  quantity: number;

  @IsString()
  cart_id: string;
}
