import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Status } from '../../models/Enums';
import { Order, OrderDocument } from '../../schemas/order.schema';
import { confirmOrderDto, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name, 'AGRIHA_DB')
    private OrderModel: Model<OrderDocument>,
  ) {}

  async sellerOrderPlacedList(JwtData: any) {
    try {
      const data = await this.OrderModel.find({
        $and: [
          { seller_id: JwtData.id },
          {
            products: {
              $elemMatch: { delivery_status: { $ne: Status.DELIVERED } },
            },
          },
        ],
      })
        .populate('user_id')
        .populate({
          path: 'products',
          populate: {
            path: 'productId',
          },
        })
        .populate('address_id');
      return { status: 200, orderList: data };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async orderConfirmed(id) {
    try {
      const data = await this.OrderModel.updateOne(
        { 'products._id': id },
        {
          $set: {
            'products.$.confirm': true,
            'products.$.delivery_status': Status.CONFIRM,
          },
        },
      );
      return { status: 200, message: 'Order confirmation successful' };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async deliveredOrders(Jwtdata: any) {
    try {
      const data = await this.OrderModel.find({
        $and: [
          { seller_id: Jwtdata.id },
          {
            products: {
              $elemMatch: { delivery_status: { $eq: Status.DELIVERED } },
            },
          },
        ],
      })
        .populate('user_id')
        .populate({
          path: 'products',
          populate: {
            path: 'productId',
          },
        })
        .populate('address_id');
      return { status: 200, orderHistory: data };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }
}
