import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from '../schemas/wallet.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Wallet.name, schema: WalletSchema }],
      'AGRIHA_DB',
    ),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
