import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  coinCreditHistory,
  coinCreditHistoryDocument,
} from 'src/schemas/coin_history.schema';
import { Wallet, WalletDocument } from '../schemas/wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name, 'AGRIHA_DB')
    private WalletModel: Model<WalletDocument>,
    @InjectModel(coinCreditHistory.name, 'AGRIHA_DB')
    private coinCreditHistoryModel: Model<coinCreditHistoryDocument>,
  ) {}
  findAll() {
    return `This action returns all wallet`;
  }

  async findOne(id: ObjectId) {
    try {
      const data = await this.WalletModel.findOne({ user_id: id });
      const history = await this.coinCreditHistoryModel
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
      return { status: 200, data, history };
    } catch (error) {
      return { status: 401, error: error };
    }
  }

  async findwalletHistory(id: ObjectId) {
    try {
      const history = await this.coinCreditHistoryModel.find({
        $or: [{ sender: id }, { recipient: id }],
      });
      return { status: 200, history };
    } catch (error) {
      return { status: 401, error: error };
    }
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
