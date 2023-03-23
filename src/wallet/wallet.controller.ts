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
import { CreateWalletDto } from './dto/create-wallet.dto';
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
