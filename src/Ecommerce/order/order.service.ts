import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../../schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name, 'AGRIHA_DB')
    private OrderModel: Model<OrderDocument>,
  ) {}

  async sellerOrderList(JwtData: any) {
    try {
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }
}
