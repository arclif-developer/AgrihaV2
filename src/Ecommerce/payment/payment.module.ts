import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { RazorpayModule } from 'nestjs-razorpay';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../../schemas/order.schema';
import { Wallet, WalletSchema } from '../../schemas/wallet.schema';
import { Cart, CartSchema } from 'src/schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Order.name, schema: OrderSchema },
        { name: Cart.name, schema: CartSchema },
      ],
      'AGRIHA_DB',
    ),
    RazorpayModule.forRoot({
      key_id: 'rzp_test_iMKaW0U63x6w4O',
      key_secret: 'Amx4AO6TcMKz3QqU01m1ZN7X',
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
