import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectRazorpay } from 'nestjs-razorpay';
import * as Razorpay from 'razorpay';
import { Status } from '../../models/Enums';
import { Order, OrderDocument } from '../../schemas/order.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  private instance: any;
  constructor(
    @InjectRazorpay() private readonly razorpayClient: any = Razorpay,
    @InjectModel(Order.name, 'AGRIHA_DB')
    private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(
    createOrderDto: CreatePaymentDto,
    Jwtdata,
    payment_capture: 0 | 1 = 1,
  ) {
    try {
      let order;
      let response;
      if (createOrderDto.payment_mode === 'online') {
        const options = {
          amount: `${parseFloat(createOrderDto.amount)}00`,
          currency: createOrderDto.currency,
          receipt: 'receipt#1',
          payment_capture,
        };
        order = await this.razorpayClient.orders.create(options);
      } else {
        order.status = 'created';
      }
      if (order?.status === 'created') {
        response = await this.orderModel
          .create({
            user_id: Jwtdata.id,
            razorpay_order_id: order.id,
            status: order.status,
            amount: order.amount,
            address_id: createOrderDto.address_id,
            products: createOrderDto.product_id,
            payment_method: createOrderDto.payment_mode,
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return {
        status: 200,
        message: 'New order created successfully.',
        data: response,
      };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async capturePayment(paymentId: string, amount: number) {
    const payment = await this.razorpayClient.payments.capture(
      paymentId,
      amount,
    );
    return payment;
  }

  async verifyPayment(razorpay_order_id: string, razorpay_payment_id: string) {
    try {
      const response = await this.razorpayClient.payments.fetch(
        razorpay_payment_id,
      );
      if (response?.captured === true) {
        await this.orderModel.updateOne(
          { razorpay_order_id: razorpay_order_id },
          {
            $set: {
              razorpay_payment_id: response.id,
              status: response.status,
              captured: response.captured,
              method: response.method,
              acquirer_data: response.acquirer_data,
            },
          },
        );
        return { status: 200, message: 'Payment successfully completed' };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPaymentDetails(paymentId: string) {
    const payment = await this.razorpayClient.payments.fetch(paymentId);
    return payment;
  }
}
