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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createAddressDto: CreateAddressDto,
    @GetCurrentUserById() Jwtdata: any,
  ) {
    return this.addressService.create(createAddressDto, Jwtdata);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetCurrentUserById() Jwtdata: any) {
    return this.addressService.findAll(Jwtdata);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.addressService.remove(id);
  }
}
