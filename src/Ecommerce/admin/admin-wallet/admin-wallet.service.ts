import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PurchaseCoinHistory,
  PurchaseCoinHistoryDocument,
} from '../../../schemas/PurchaseCoinHistory';
import { Wallet, WalletDocument } from '../../../schemas/wallet.schema';
import { CreateAdminWalletDto } from './dto/create-admin-wallet.dto';
import { UpdateAdminWalletDto } from './dto/update-admin-wallet.dto';

@Injectable()
export class AdminWalletService {
  constructor(
    @InjectModel(Wallet.name, 'AGRIHA_DB')
    private WalletModel: Model<WalletDocument>,
    @InjectModel(PurchaseCoinHistory.name, 'AGRIHA_DB')
    private PurchaseCoinHistory: Model<PurchaseCoinHistoryDocument>,
  ) {}
  create(createAdminWalletDto: CreateAdminWalletDto) {
    return 'This action adds a new adminWallet';
  }

  async findAll() {}

  async findAdminWalletData() {
    try {
      const wallet = await this.WalletModel.findOne({ role: 'admin' });
      const purchaseHistory = await this.PurchaseCoinHistory.find().populate({
        path: 'user_id',
        populate: {
          path: 'registered_id',
        },
      });
      return { status: 200, balance: wallet.balance, purchaseHistory };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async update(updateAdminWalletDto: UpdateAdminWalletDto) {
    try {
      await this.WalletModel.updateOne(
        { role: 'admin' },
        { $set: updateAdminWalletDto },
      );
    } catch (error) {
      return { status: 401, ErrorMessage: error.message };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} adminWallet`;
  }
}
