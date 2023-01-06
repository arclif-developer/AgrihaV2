import { Module } from '@nestjs/common';
import { UserPaymentService } from './user_payment.service';
import { UserPaymentController } from './user_payment.controller';
import { Payment_user, Payment_userSchema } from 'src/schemas/payment_user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { architects, architectsSchema } from 'src/schemas/architects.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Payment_user.name, schema: Payment_userSchema },
    { name: architects.name, schema: architectsSchema },
  ])],
  
  controllers: [UserPaymentController],
  providers: [UserPaymentService]
})

export class UserPaymentModule {}
