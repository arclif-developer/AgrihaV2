import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Wallet, WalletDocument } from '../schemas/wallet.schema';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name, 'AGRIHA_DB')
    private WalletModel: Model<WalletDocument>,
  ) {}
  findAll() {
    return `This action returns all wallet`;
  }

  async findOne(id: ObjectId) {
    try {
      const data = await this.WalletModel.findOne({ user_id: id });
      return { status: 200, data };
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
