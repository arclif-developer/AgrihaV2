import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../../../schemas/order.schema';
import { Wallet, WalletSchema } from '../../../schemas/wallet.schema';
import {
  purchaseAmount,
  purchaseAmountSchema,
} from '../../../schemas/purchaseAmount.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Order.name, schema: OrderSchema },
        { name: Wallet.name, schema: WalletSchema },
        { name: purchaseAmount.name, schema: purchaseAmountSchema },
      ],
      'AGRIHA_DB',
    ),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AdminOrderModule {}
