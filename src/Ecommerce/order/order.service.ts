import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Wallet, WalletDocument } from '../../schemas/wallet.schema';
import { jwt } from 'twilio';
import { Order, OrderDocument } from '../../schemas/order.schema';

import {
  coinHistory,
  coinHistoryDocument,
} from '../../schemas/coin_history.schema';
import { Status } from '../../models/Enums/Status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name, 'AGRIHA_DB')
    private OrderModel: Model<OrderDocument>,
    @InjectModel(Wallet.name, 'AGRIHA_DB')
    private WalletModel: Model<WalletDocument>,
    @InjectModel(coinHistory.name, 'AGRIHA_DB')
    private coinHistoryModel: Model<coinHistoryDocument>,
  ) {}

  async sellerOrderPlacedList(JwtData: any) {
    try {
      const data: any = await this.OrderModel.find({
        products: {
          $elemMatch: {
            delivery_status: { $ne: Status.DELIVERED },
            seller_id: JwtData.id,
          },
        },
      })
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
        (items) => items.seller_id == JwtData.id,
      );
      return { status: 200, orderList };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async orderConfirmed(id, Jwtdata) {
    try {
      let update = false;
      const IsOrder: any = await this.OrderModel.findOne({
        'products._id': id,
      });
      if (IsOrder.role === 'contractor' || IsOrder.role === 'general') {
        const confirmProduct = IsOrder?.products.filter(
          (items) => items._id == id,
        );
        if (confirmProduct[0]?.amount >= 1000) {
          console.log(confirmProduct[0]?.amount);
          let creditCoin = confirmProduct[0]?.amount / 1000;
          const IsSellerWallet: any = await this.WalletModel.findOne({
            user_id: Jwtdata.id,
          });
          if (IsSellerWallet?.balance >= creditCoin) {
            await IsSellerWallet.updateOne({ $inc: { balance: -creditCoin } });
            await this.WalletModel.updateOne(
              { user_id: IsOrder.user_id },
              { $inc: { balance: creditCoin } },
            );
            this.coinHistoryModel.create({
              coinAmount: creditCoin,
              sender: Jwtdata.id,
              recipient: IsOrder.user_id,
            });
            update = true;
          } else {
            throw new NotAcceptableException(
              'Insufficient Coin balance. Order is not confirmed',
            );
          }
        } else {
          update = true;
        }
      } else {
        update = true;
      }
      if (update) {
        await this.OrderModel.updateOne(
          {
            'products._id': id,
          },
          {
            $set: {
              'products.$.confirm': true,
              'products.$.delivery_status': Status.CONFIRM,
            },
          },
        );
        return { status: 200, message: 'Order confirmed' };
      }
    } catch (error) {
      console.log(error);
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
