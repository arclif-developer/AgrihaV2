import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from '../schemas/wallet.schema';
import {
  coinCreditHistory,
  coinCreditHistorySchema,
} from 'src/schemas/coin_history.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Wallet.name, schema: WalletSchema },
        { name: coinCreditHistory.name, schema: coinCreditHistorySchema },
      ],
      'AGRIHA_DB',
    ),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
