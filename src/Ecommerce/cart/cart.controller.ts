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
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { GetCurrentUserById } from '../../utils';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /// ##################  Add to cart  ####################### ///
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createCartDto: CreateCartDto,
    @GetCurrentUserById() Jwtdata: any,
  ) {
    return this.cartService.create(createCartDto, Jwtdata);
  }
  /// ############## ...................... ################# ///

  /// ############  User Id to find Cart all items ############### ///
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findall(@GetCurrentUserById() Jwtdata: any) {
    return this.cartService.findAll(Jwtdata.id);
  }
  /// ############## ...................... ################# ///

  /// ############  product Id to find Cart items ############### ///
  @Get('findone/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: ObjectId) {
    return this.cartService.findOne(id);
  }
  /// ############## ...................... ################# ///

  /// ######## Cart product qauntity increment and decrement ####### ///
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateQuanity(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateQuanity(id, updateCartDto);
  }
  /// ############## ...................... ################# ///

  /// ##################  Delete cart items  ####################### ///
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
  /// ############## ...................... ################# ///
}
