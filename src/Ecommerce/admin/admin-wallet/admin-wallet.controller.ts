import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminWalletService } from './admin-wallet.service';
import { CreateAdminWalletDto } from './dto/create-admin-wallet.dto';
import { UpdateAdminWalletDto } from './dto/update-admin-wallet.dto';

@Controller('admin-wallet')
export class AdminWalletController {
  constructor(private readonly adminWalletService: AdminWalletService) {}

  // @Post()
  // create(@Body() createAdminWalletDto: CreateAdminWalletDto) {
  //   return this.adminWalletService.create(createAdminWalletDto);
  // }

  @Get('')
  findAdminWalletData() {
    return this.adminWalletService.findAdminWalletData();
  }

  // @Get()
  // findOne() {
  //   return this.adminWalletService.findOne();
  // }

  @Patch()
  update(@Body() updateAdminWalletDto: UpdateAdminWalletDto) {
    return this.adminWalletService.update(updateAdminWalletDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminWalletService.remove(+id);
  // }
}
