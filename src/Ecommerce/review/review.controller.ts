import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, ReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /// ################ Add product review and ratings ################### ///
  @Post('add_review')
  addReview(@Body() reviewDto: ReviewDto) {
    return this.reviewService.addProductReview(reviewDto);
  }
  /// #################### ...................... ##################### ///

  /// ################ Product id to find reviews and ratings ############## ///
  @Get(':id')
  getReviews(@Param('id') id: string) {
    return this.reviewService.getproductReview(id);
  }
  /// #################### ...................... ##################### ///

  /// ################ Review Doc id to delete review and rating ############## ///
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove_review(id);
  }
  /// #################### ...................... ##################### ///
}
