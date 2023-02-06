import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../schemas/product.schema';
import { review, reviewDocument } from '../../schemas/reviews.schema';

// import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  /// ######################################### Search products ######################################## ///
  async searchProducts(searchString) {
    try {
      const data = await this.productModel
        .find({
          $text: { $search: searchString },
        })
        .catch((error) => {
          throw new NotFoundException(error);
        });
      return { status: 200, products: data };
    } catch (error) {
      return error;
    }
  }
  /// ##################################### ...................... #################################### ///

  /// ######################## find category or subcategory to find products ######################### ///
  async catelog_Or_Products(id: string) {
    try {
      const data = await this.productModel
        .find({
          $or: [{ category_id: id }, { subcategory_id: id }],
        })
        .catch((error) => {
          console.log(error);
          throw new NotFoundException();
        });
      return { status: 200, products: data };
    } catch (error) {
      return error;
    }
  }
  /// ###################################### ...................... #################################### ///

  /// ########################### Product id to find single product data ############################### ///
  async findSingleProduct(id: string) {
    try {
      const data = await this.productModel
        .findById(id)
        .exec()
        .catch((error) => {
          throw new NotFoundException();
        });
      return { status: 200, productDta: data };
    } catch (error) {
      return error;
    }
  }
  /// ##################################### ...................... ####################################### ///

  /// ########################### Sort product by price ############################### ///
  async sortProduct(value) {
    try {
      const data = await this.productModel
        .find({})
        .sort({ mrp: value })
        .catch((error) => {
          throw new NotFoundException(error);
        });
      return { status: 200, products: data };
    } catch (error) {
      return error;
    }
  }
  /// ##################################### ...................... ####################################### ///

  // async facility_toFindProduct(facilityname) {
  //   try {
  //   } catch (error) {
  //     return { status: 404, error: error.message };
  //   }
  // }

  getProduct() {
    return this.productModel
      .find({})
      .populate('category_id')
      .populate('subcategory_id');
  }
}
