import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from '../schemas/wallet.schema';
import {
  coinCreditHistory,
  coinCreditHistorySchema,
} from '../schemas/coin_history.schema';
import { RazorpayModule } from 'nestjs-razorpay';
import { orderCoin, orderCoinSchema } from '../schemas/orderCoin';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Wallet.name, schema: WalletSchema },
        { name: coinCreditHistory.name, schema: coinCreditHistorySchema },
        { name: orderCoin.name, schema: orderCoinSchema },
      ],
      'AGRIHA_DB',
    ),
    RazorpayModule.forRoot({
      key_id: 'rzp_test_iMKaW0U63x6w4O',
      key_secret: 'Amx4AO6TcMKz3QqU01m1ZN7X',
    }),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
