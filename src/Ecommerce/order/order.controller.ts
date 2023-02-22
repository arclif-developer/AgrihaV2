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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from 'src/utils';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('seller/orderlist')
  @UseGuards(AuthGuard('jwt'))
  sellerOrderList(@GetCurrentUserById() Jwtdata: any) {
    return this.orderService.sellerOrderList(Jwtdata);
  }
}
