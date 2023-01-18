import { Module } from '@nestjs/common';
import { ArcPaymentService } from './arc_payment.service';
import { ArcPaymentController } from './arc_payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { architects, architectsSchema } from '../schemas/architects.schema';
import { Payment, PaymentSchema } from '../schemas/payment.schema';
import { register, registerSchema } from '../schemas/register.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Payment.name, schema: PaymentSchema },
        // { name: Posts_old.name, schema: Posts_oldSchema },
        { name: architects.name, schema: architectsSchema },
        { name: register.name, schema: registerSchema },
      ],
      'AGRIHA_DB',
    ),
  ],

  controllers: [ArcPaymentController],
  providers: [ArcPaymentService],
})
export class ArcPaymentModule {}
