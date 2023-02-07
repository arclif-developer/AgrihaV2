import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /// ##################  Add to cart  ####################### ///
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }
  /// ############## ...................... ################# ///

  /// ############  User Id to find Cart all items ############### ///
  @Get(':id')
  findall(@Param('id') id: string) {
    return this.cartService.findAll(id);
  }
  /// ############## ...................... ################# ///

  /// ######## Cart product qauntity increment and decrement ####### ///
  @Patch(':id')
  updateQuanity(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateQuanity(id, updateCartDto);
  }
  /// ############## ...................... ################# ///

  /// ##################  Delete cart items  ####################### ///
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
  /// ############## ...................... ################# ///
}
