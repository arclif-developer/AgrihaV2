import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Cart, CartDocument } from '../../schemas/cart.schema';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async create(createWishlistDto: CreateWishlistDto, Jwtdata) {
    try {
      const IsCartproduct = await this.cartModel.findOne({
        product_id: createWishlistDto.product_id,
      });
      if (IsCartproduct) {
        IsCartproduct.whishlist = true;
        await IsCartproduct.save();
      } else {
        await this.cartModel.create({
          product_id: createWishlistDto.product_id,
          user_id: Jwtdata.id,
          whishlist: true,
          status: false,
        });
      }
      return { status: 200, message: 'Product added to wishlist' };
    } catch (error) {
      return { status: 404, message: error.message };
    }
  }

  async findAll(id: ObjectId) {
    try {
      const data = await this.cartModel.find({
        $and: [{ user_id: id }, { whishlist: true }],
      });
      return { status: 200, wishlist: data };
    } catch (error) {
      return { status: 404, message: error.message };
    }
  }

  remove(id: ObjectId) {
    try {
      this.cartModel.updateOne({ _id: id }, { $set: { whishlist: false } });
      return { status: 200, message: 'Product removed successfully' };
    } catch (error) {
      return { status: 404, message: error.message };
    }
  }
}
