import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../../schemas/cart.schema';
import { Product, ProductDocument } from '../../schemas/product.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name, 'AGRIHA_DB') private cartModel: Model<CartDocument>,
    @InjectModel(Product.name, 'AGRIHA_DB')
    private productModel: Model<ProductDocument>,
  ) {}

  /// ########################  Add product to cart ######################### ///
  async create(createCartDto: CreateCartDto) {
    try {
      const response = await this.productModel.findById(
        createCartDto.product_id,
      );
      const newCart = new this.cartModel({
        product_id: createCartDto.product_id,
        user_id: createCartDto.user_id,
        quantity: createCartDto.quantity,
        subTotal: response.mrp * createCartDto.quantity,
      });
      const data = await newCart.save().catch((error) => {
        throw new NotAcceptableException(error);
      });
      if (data) {
        return { status: 200, message: 'Product added to cart' };
      } else {
        return { status: 401, error: 'Something went wrong' };
      }
    } catch (error) {
      return error;
    }
  }
  /// ####################### ...................... ######################## ///

  /// ######################## UserId to find all cart items ######################### ///
  async findAll(id: string) {
    try {
      const cartItems = await this.cartModel
        .find({ user_id: id })
        .populate('product_id')
        .catch((error) => {
          throw new NotFoundException(error);
        });
      return { status: 200, items: cartItems };
    } catch (error) {
      return error;
    }
  }
  /// ####################### ...................... ######################## ///

  /// ############### Cart item quantiy increment and decrement ############## ///
  async updateQuanity(id: string, updateCartDto: UpdateCartDto) {
    try {
      const response = await this.productModel.findById(id);
      const subtotal = response.mrp * updateCartDto.quantity;
      await this.cartModel.updateOne(
        { _id: updateCartDto.cart_id },
        {
          $inc: { quantity: updateCartDto.quantity, subTotal: subtotal },
        },
      );
      return { status: 200, message: 'Cart product Quantity updated' };
    } catch (error) {
      return error;
    }
  }
  /// ####################### ...................... ######################## ///

  /// ###################### Cart id to  remove product ##################### ///
  async remove(id: string) {
    try {
      const deleteItem = await this.cartModel.deleteOne({ _id: id });
      return { status: 200, message: 'Cart item deleted successfully' };
    } catch (error) {
      return error;
    }
  }
  /// ####################### ...................... ######################## ///
}
