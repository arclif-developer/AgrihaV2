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
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../../utils';
import { ObjectId } from 'mongoose';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @GetCurrentUserById() Jwtdata: any,
  ) {
    return this.wishlistService.create(createWishlistDto, Jwtdata);
  }

  @Get('user/:id')
  findAll(@Param('id') id: ObjectId) {
    return this.wishlistService.findAll(id);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.wishlistService.remove(id);
  }
}
