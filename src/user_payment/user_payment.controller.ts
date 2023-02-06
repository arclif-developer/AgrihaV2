import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserPaymentService } from './user_payment.service';
import { CreateUserPaymentDto } from './dto/create-user_payment.dto';
import { UpdateUserPaymentDto } from './dto/update-user_payment.dto';
import { ObjectId } from 'mongoose';

@Controller('user-payment')
export class UserPaymentController {
  constructor(private readonly userPaymentService: UserPaymentService) {}

  @Post()
  create(@Body() createUserPaymentDto: CreateUserPaymentDto) {
    return this.userPaymentService.create(createUserPaymentDto);
  }

  @Get()
  findAll() {
    return this.userPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.userPaymentService.findOne(id);
  }

  //find by project id=>Project id
  @Get('getbyproject/:id')
  findbyproject(@Param('id') id: ObjectId) {
    return this.userPaymentService.findbyproject(id);
  }

  //find by creator id=>creator id
  @Get('getbycreator/:id')
  findbycreator(@Param('id') id: ObjectId) {
    return this.userPaymentService.findbycreator(id);
  }

  //update
  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateUserPaymentDto: UpdateUserPaymentDto,
  ) {
    return this.userPaymentService.update(id, updateUserPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.userPaymentService.remove(id);
  }
}
