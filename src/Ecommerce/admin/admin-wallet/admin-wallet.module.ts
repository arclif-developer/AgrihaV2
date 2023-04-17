import { Module } from '@nestjs/common';
import { AdminWalletService } from './admin-wallet.service';
import { AdminWalletController } from './admin-wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from '../../../schemas/wallet.schema';
import {
  PurchaseCoinHistory,
  PurchaseCoinHistorySchema,
} from '../../../schemas/PurchaseCoinHistory';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Wallet.name, schema: WalletSchema },
        { name: PurchaseCoinHistory.name, schema: PurchaseCoinHistorySchema },
      ],
      'AGRIHA_DB',
    ),
  ],
  controllers: [AdminWalletController],
  providers: [AdminWalletService],
})
export class AdminWalletModule {}
