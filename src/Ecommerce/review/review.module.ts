import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { review, reviewSchema } from '../../schemas/reviews.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: review.name, schema: reviewSchema }],
      'AGRIHA_DB',
    ),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
