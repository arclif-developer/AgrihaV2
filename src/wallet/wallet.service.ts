import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as Razorpay from 'razorpay';
import { InjectRazorpay } from 'nestjs-razorpay';
import {
  coinHistory,
  coinHistoryDocument,
} from '../schemas/coin_history.schema';
import { Wallet, WalletDocument } from '../schemas/wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import {
  PurchaseCoinHistory,
  PurchaseCoinHistoryDocument,
} from '../schemas/PurchaseCoinHistory';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name, 'AGRIHA_DB')
    private WalletModel: Model<WalletDocument>,
    @InjectModel(coinHistory.name, 'AGRIHA_DB')
    private coinHistoryModel: Model<coinHistoryDocument>,
    @InjectRazorpay() private readonly razorpayClient: any = Razorpay,
    @InjectModel(PurchaseCoinHistory.name, 'AGRIHA_DB')
    private purchaseCoinHistoryModel: Model<PurchaseCoinHistoryDocument>,
  ) {}
  findAll() {
    return `This action returns all wallet`;
  }

  async findOne(id: ObjectId) {
    try {
      const data = await this.WalletModel.findOne({ user_id: id });
      const coinHistory = await this.coinHistoryModel
        .find({
          $or: [{ sender: id }, { recipient: id }],
        })
        .populate({
          path: 'sender',
          populate: {
            path: 'registered_id',
          },
        })
        .populate({
          path: 'recipient',
          populate: {
            path: 'registered_id',
          },
        });
      const purchaseCoin = await this.purchaseCoinHistoryModel.find({
        user_id: id,
      });
      const history = [...coinHistory, ...purchaseCoin];
      return { status: 200, data, history };
    } catch (error) {
      return { status: 401, error: error };
    }
  }

  async findwalletHistory(id: ObjectId) {
    try {
      const history = await this.coinHistoryModel.find({
        $or: [{ sender: id }, { recipient: id }],
      });
      return { status: 200, history };
    } catch (error) {
      return { status: 401, error: error };
    }
  }

  async purchaseWalletCoin(
    data: any,
    Jwtdata: any,
    payment_capture: 0 | 1 = 1,
  ) {
    const options = {
      amount: `${parseInt(data.amount)}00`,
      currency: 'INR',
      receipt: 'receipt#1',
      payment_capture,
    };
    const order = await this.razorpayClient.orders.create(options);
    const newOrder = await this.purchaseCoinHistoryModel.create({
      user_id: Jwtdata.id,
      razorpay_order_id: order.id,
      status: order.status,
      amount: data.amount,
      role: Jwtdata.role,
    });
    return {
      status: 200,
      message: 'New order created successfully.',
      data: newOrder,
    };
  }

  async verifyPayment(razorpay_order_id: string, razorpay_payment_id: string) {
    try {
      const response = await this.razorpayClient.payments.fetch(
        razorpay_payment_id,
      );
      if (response?.captured === true) {
        const data: any = await this.purchaseCoinHistoryModel.findOneAndUpdate(
          { razorpay_order_id: razorpay_order_id },
          {
            $set: {
              razorpay_payment_id: response.id,
              status: response.status,
              captured: response.captured,
              method: response.method,
              acquirer_data: response.acquirer_data,
            },
          },
        );
        await this.WalletModel.updateOne(
          { user_id: data.user_id },
          { $inc: { balance: data.amount } },
        );
        return { status: 200, message: 'Payment successfully completed' };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
