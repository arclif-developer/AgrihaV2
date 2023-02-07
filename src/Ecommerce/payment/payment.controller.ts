import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../../utils';

@Controller('product/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-order')
  @UseGuards(AuthGuard('jwt'))
  createOrder(
    @Body() createOrderDto: CreatePaymentDto,
    @GetCurrentUserById() Jwtdata: any,
  ) {
    return this.paymentService.createOrder(createOrderDto, Jwtdata);
  }

  @Post('verify')
  capturePayment(@Body() body: any) {
    const { razorpay_order_id, razorpay_payment_id } = body;
    return this.paymentService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
    );
  }
}
