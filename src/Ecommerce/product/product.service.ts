import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReqProducts } from '../../schemas/reqProducts.schema';
import { Product, ProductDocument } from '../../schemas/product.schema';
import { review, reviewDocument } from '../../schemas/reviews.schema';
import * as crypto from 'crypto';
import {
  AddNewProductsDto,
  Req_productDetails,
} from './dto/create-product.dto';
import { Cart, CartDocument } from '../../schemas/cart.schema';

// import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name, 'AGRIHA_DB')
    private productModel: Model<ProductDocument>,
    @InjectModel(ReqProducts.name, 'AGRIHA_DB')
    private reqProductModel: Model<ProductDocument>,
    @InjectModel(Cart.name, 'AGRIHA_DB') private CartModel: Model<CartDocument>,
  ) {}

  /// ######################################### Search products ######################################## ///
  async searchProducts(searchString) {
    try {
      const data = await this.productModel
        .find({
          $text: { $search: searchString },
        })
        .populate('category_id')
        .populate('subcategory_id')
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
        .populate('category_id')
        .populate('subcategory_id')
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
  async findSingleProduct(id: string, query) {
    try {
      let cart = false;
      const data: any = await this.productModel
        .findById(id)
        .populate('category_id')
        .populate('subcategory_id')
        .exec()
        .catch((error) => {
          throw new NotFoundException();
        });
      if (
        query.user_id &&
        query.user_id !== undefined &&
        query.user_id !== '' &&
        query.user_id !== 'undefined'
      ) {
        const IsCart = await this.CartModel.findOne({
          $and: [{ product_id: data._id }, { user_id: query?.user_id }],
        });

        if (IsCart !== null) {
          cart = true;
        }
      }
      return { status: 200, productDta: data, cart: cart };
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
  /// ##################################### ...................... ######################## ///

  async add_requests(req_productDetails: any, Jwtdata) {
    try {
      req_productDetails.creator = Jwtdata.id;
      const resp = await this.reqProductModel.create(req_productDetails);
      return { status: 200, data: resp };
    } catch (error) {
      return { status: 404, error: error.message };
    }
  }

  /// ########################### GET ALL PRODUCTS  ############################### ///
  getProduct() {
    return this.productModel
      .find({})
      .populate('category_id')
      .populate('subcategory_id');
  }
  /// ############################## ...................... ######################## ///

  /// ############### SELLER / BUSINESS USERS  ADD  NEW PRODUCTS   ################### ///
  addNewProduct(addNewProductsDta: any, Jwtdata) {
    try {
      const name = addNewProductsDta?.name.slice(0, 3);
      const randomNumber = Math.floor(Math.random() * 1000);
      addNewProductsDta.sku = 'ARC' + name + randomNumber;
      const hash = crypto.randomBytes(4).toString('hex');
      hash.toUpperCase();
      addNewProductsDta.productCode = `ARCPRO` + hash;
      addNewProductsDta.seller_id = Jwtdata.id;
      this.productModel.create(addNewProductsDta).catch((error) => {
        throw new Error(error.message);
      });
      return { status: 200, message: 'New Products created' };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }
  /// ############################## ...................... ######################## ///

  async sellersProductsFn(Jwtdata) {
    try {
      const data = await this.productModel.find({ seller_id: Jwtdata.id });
      return { status: 200, sellerProducts: data };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async requestProducts(query) {
    try {
      let data;
      if (query.district === 'all') {
        data = await this.reqProductModel.find({});
      } else {
        data = await this.reqProductModel.find({ district: query?.district });
      }

      return { status: 200, reqProducts: data };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async brandListFn() {
    try {
      const brands = await this.productModel
        .find({ brand: { $nin: [null, ''] } })
        .select('brand');
      return { status: 200, brands: brands };
    } catch (error) {
      return { status: 404, error: error.message };
    }
  }
}
