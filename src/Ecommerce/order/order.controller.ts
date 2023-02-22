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
  orderConfirmed(@Body('products_id') id: ObjectId) {
    return this.orderService.orderConfirmed(id);
  }
}
