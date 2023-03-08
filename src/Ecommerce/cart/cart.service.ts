import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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
  async create(createCartDto: CreateCartDto, Jwtdata) {
    try {
      const IsCart = await this.cartModel.findOne({
        $and: [
          { product_id: createCartDto.product_id },
          { user_id: Jwtdata.id },
        ],
      });
      const IsProduct = await this.productModel.findOne({
        _id: createCartDto.product_id,
      });
      if (IsProduct.stock_qty >= createCartDto.quantity) {
        if (IsCart) {
          return { status: 200, message: 'Product already added to cart' };
        } else {
          this.cartModel.create({
            product_id: createCartDto.product_id,
            user_id: Jwtdata.id,
          });
          await IsProduct.updateOne({
            $inc: { stock_qty: -createCartDto.quantity },
          });
        }
        return { status: 200, message: 'Product add to cart' };
      } else {
        throw new Error('Out of stock quantity');
      }
    } catch (error) {
      return { status: 400, error: error.message };
    }
  }
  /// ####################### ...................... ######################## ///

  /// ######################## UserId to find all cart items ######################### ///
  async findAll(id: string) {
    try {
      const cartItems = await this.cartModel
        .find({ $and: [{ user_id: id }, { cart: true }] })
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
      console.log(response);
      await this.cartModel.updateOne(
        { _id: updateCartDto.cart_id },
        {
          $inc: { quantity: updateCartDto.quantity },
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
