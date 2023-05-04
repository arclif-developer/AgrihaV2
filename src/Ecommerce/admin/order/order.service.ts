import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Status } from '../../../models/Enums';
import {
  purchaseAmount,
  purchaseAmountDocument,
} from '../../../schemas/purchaseAmount.schema';
import { Wallet, WalletDocument } from '../../../schemas/wallet.schema';
import { Order, OrderDocument } from '../../../schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name, 'AGRIHA_DB')
    private OrderModel: Model<OrderDocument>,
    @InjectModel(Wallet.name, 'AGRIHA_DB')
    private WalletModel: Model<WalletDocument>,
    @InjectModel(purchaseAmount.name, 'AGRIHA_DB')
    private purchaseAmountModel: Model<purchaseAmountDocument>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() {
    try {
      const data: any = await this.OrderModel.find({ 'products.admin': true })
        .populate('user_id')
        .populate({
          path: 'products',
          populate: {
            path: 'productId',
          },
        })
        .populate('address_id');
      const orderedProducts = data?.flatMap((order) => {
        return order.products.map((product) => ({
          ...product.toObject(),
          address: order.address_id,
        }));
      });
      const orderList = orderedProducts?.filter(
        (items) => items.admin === true,
      );
      return { status: 200, orderList };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: ObjectId, updateOrderDto: UpdateOrderDto) {
    try {
      return this.OrderModel.updateOne(
        { 'products._id': id },
        {
          $set: {
            'products.$.delivery_status': updateOrderDto.delivery_status,
            'products.$.delivery_date': updateOrderDto.delivery_date,
          },
        },
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async confirmOrder(id) {
    try {
      let update = false;
      const IsOrder: any = await this.OrderModel.findOne({
        'products._id': id,
      });
      const IsProduct = IsOrder.products.filter((items) => items._id == id);
      if (IsProduct[0]?.amount >= 1000) {
        let creditCoin = IsProduct[0]?.amount / 1000;
        const IsAdminWallet: any = await this.WalletModel.findOne({
          role: 'admin',
        });
        if (IsAdminWallet?.balance >= creditCoin) {
          await IsAdminWallet.updateOne({ $inc: { balance: -creditCoin } });
          await this.WalletModel.updateOne(
            { user_id: IsOrder.user_id },
            { $inc: { balance: creditCoin } },
          );
          update = true;
        } else {
          throw new Error('Insufficient coin balance, Order is not confirmed');
        }
      } else {
        update = true;
      }
      if (update === true) {
        await this.OrderModel.updateOne(
          {
            'products._id': id,
          },
          {
            $set: {
              'products.$.confirm': true,
              'products.$.delivery_status': Status.CONFIRMED,
            },
          },
        );
        return { status: 200, message: 'Order confirmed' };
      }
    } catch (error) {
      return { status: 200, error: error.message };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
