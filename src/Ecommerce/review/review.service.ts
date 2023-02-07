import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { review, reviewDocument } from '../../schemas/reviews.schema';
import { CreateReviewDto, ReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(review.name, 'AGRIHA_DB')
    private reviewModel: Model<reviewDocument>,
  ) {}

  /// ################################## Add product review and ratings ################################## ///
  async addProductReview(reviewDto: ReviewDto) {
    try {
      const newReview = new this.reviewModel(reviewDto);
      const resDta = await newReview.save().catch((error) => {
        throw new NotAcceptableException(error);
      });
      return { status: 200, data: resDta };
    } catch (error) {
      return error;
    }
  }
  /// ###################################### ...................... ######################################## ///

  /// #################################### Product id to find reviews ##################################### ///
  async getproductReview(id: string) {
    try {
      const reviewDta = await this.reviewModel
        .find({ product_id: id })
        .populate('creator')
        .catch((error) => {
          throw new NotFoundException(error);
        });
      return { status: 200, data: reviewDta };
    } catch (error) {
      return error;
    }
  }
  /// ########################################## ...................... ##################################### ///

  /// #################################### Review doc id to remove review ##################################### ///
  async remove_review(id: string) {
    try {
      const response = await this.reviewModel.deleteOne({ _id: id });
      if (response.deletedCount === 1) {
        return { status: 200, message: 'Deleted successfully' };
      } else {
        return {
          status: 200,
          message: 'Something went wrong.Please try again',
        };
      }
    } catch (error) {
      return error;
    }
  }
  /// ########################################## ...................... ##################################### ///
}
