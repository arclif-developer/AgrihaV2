import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { confirmOrderDto, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../../utils';
import { ObjectId } from 'mongoose';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('seller/order_placed_list')
  @UseGuards(AuthGuard('jwt'))
  sellerOrderPlacedList(@GetCurrentUserById() Jwtdata: any) {
    return this.orderService.sellerOrderPlacedList(Jwtdata);
  }

  @Patch('order_confirmed')
  @UseGuards(AuthGuard('jwt'))
  orderConfirmed(
    @Body('products_id') id: ObjectId,
    @GetCurrentUserById() Jwtdata: any,
  ) {
    return this.orderService.orderConfirmed(id, Jwtdata);
  }

  // seller Delivered Order history view
  @Get('delivered_orders')
  @UseGuards(AuthGuard('jwt'))
  deliveredOrders(@GetCurrentUserById() Jwtdata: any) {
    return this.orderService.deliveredOrders(Jwtdata);
  }

  //user Order history view
  @Get('user_order_history')
  @UseGuards(AuthGuard('jwt'))
  userOrderHistory(@GetCurrentUserById() Jwtdata: any) {
    return this.orderService.userOrderHistory(Jwtdata);
  }
}
