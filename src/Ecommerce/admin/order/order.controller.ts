import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ObjectId } from 'mongoose';
import { ApiParam } from '@nestjs/swagger';

@Controller('/admin/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Patch('/status/:id')
  @ApiParam({
    name: 'id',
    required: false,
    description: 'Order products._id',
  })
  findOne(@Param('id') id: ObjectId, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Patch('order_confirmed/:id')
  confirmOrder(@Param('id') id: ObjectId) {
    return this.orderService.confirmOrder(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
