import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateReviewDto {}
export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  star_rate: number;
}
