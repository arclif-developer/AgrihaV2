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
import { WalletService } from './wallet.service';
import {
  CreateWalletDto,
  purchaseWalletCoinDto,
} from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../utils';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // USER ID TO FIND USER'S WALLET
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findOne(@GetCurrentUserById() Jwtdata: any) {
    return this.walletService.findOne(Jwtdata.id);
  }

  @Post('purchaseCoin')
  @UseGuards(AuthGuard('jwt'))
  purchaseWalletCoin(
    @GetCurrentUserById() Jwtdata: any,
    @Body() data: purchaseWalletCoinDto,
  ) {
    return this.walletService.purchaseWalletCoin(data, Jwtdata);
  }

  @Post('verify')
  verifyPayment(@Body() body: any) {
    const { razorpay_order_id, razorpay_payment_id } = body;
    return this.walletService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
    );
  }
  // @Get('history')
  // @UseGuards(AuthGuard('jwt'))
  // findwalletHistory(@GetCurrentUserById() Jwtdata: any) {
  //   return this.walletService.findwalletHistory(Jwtdata.id);
  // }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
