import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Req_productDetails {
  @IsString()
  image: string;

  @IsString()
  product_name: string;

  @IsString()
  product_category: string;

  @IsString()
  creator: string;
}
