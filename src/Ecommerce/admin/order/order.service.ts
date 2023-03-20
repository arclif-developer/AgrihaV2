import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async confirmOrder(id) {
    try {
      const IsOrder: any = await this.OrderModel.findOneAndUpdate(
        { 'products._id': id },
        {
          $set: {
            'products.$.confirm': true,
            'products.$.delivery_status': Status.CONFIRM,
          },
        },
      );
      if (IsOrder.role === 'contractor') {
        const confirmProduct = IsOrder?.products.filter(
          (items) => items._id == id,
        );
        const tiers = [
          { amount: 100000, coins: 100 },
          { amount: 150000, coins: 150 },
          { amount: 200000, coins: 250 },
        ];
        let purchaseAmount;
        let purchaseAmountId;
        if (confirmProduct[0]?.amount >= 100000) {
          purchaseAmount = confirmProduct[0]?.amount;
        } else {
          const IsPurchaseAmount = await this.purchaseAmountModel.findOne({
            $and: [{ user_id: IsOrder.user_id, admin: true }],
          });
          if (IsPurchaseAmount) {
            await IsPurchaseAmount.updateOne({
              $inc: { amount: confirmProduct[0]?.amount },
            });
            purchaseAmount =
              IsPurchaseAmount?.amount + confirmProduct[0]?.amount;
            purchaseAmountId = IsPurchaseAmount._id;
          } else {
            const createPurchaseAmount = await this.purchaseAmountModel.create({
              user_id: IsOrder.user_id,
              admin: true,
              amount: confirmProduct[0]?.amount,
            });
            purchaseAmount = confirmProduct[0]?.amount;
            purchaseAmountId = createPurchaseAmount._id;
          }
        }
        let creditCoin;
        if (purchaseAmount >= 100000) {
          tiers.map((items) => {
            if (purchaseAmount >= items.amount) {
              creditCoin = items.coins;
            }
          });
          const IsAdminWallet = await this.WalletModel.findOne({
            role: 'admin',
          });
          if (IsAdminWallet?.balance >= creditCoin) {
            await IsAdminWallet.updateOne({ $inc: { balance: -creditCoin } });
            await this.WalletModel.updateOne(
              { user_id: IsOrder.user_id },
              { $inc: { balance: creditCoin } },
            );
            await this.purchaseAmountModel.deleteOne({
              _id: purchaseAmountId,
            });
          } else {
            throw new NotAcceptableException('Insufficient Coin balance');
          }
        }
      }
      return { status: 200, message: 'Order confirmed' };
    } catch (error) {
      return { status: 200, error: error.message };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
