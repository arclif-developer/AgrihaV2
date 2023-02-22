import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status } from '../../models/Enums';
import { Order, OrderDocument } from '../../schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
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
        $and: [{ seller_id: JwtData.id }, { delivery_status: Status.PLACED }],
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
}
