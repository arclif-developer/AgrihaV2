import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ArcPaymentService } from './arc_payment.service';
import { CreateArcPaymentDto } from './dto/create-arc_payment.dto';
import { UpdateArcPaymentDto } from './dto/update-arc_payment.dto';

@Controller('arc-payment')
export class ArcPaymentController {
  constructor(private readonly arcPaymentService: ArcPaymentService) {}

  @Post()
  create(@Body() createArcPaymentDto: CreateArcPaymentDto) {
    return this.arcPaymentService.create(createArcPaymentDto);
  }

  @Get()
  findAll() {
    return this.arcPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.arcPaymentService.findOne(id);
  }

  //view by architect
  @Get('arcpaymentdetails/:id')
  findByArchitect(@Param('id') id: ObjectId) {
    return this.arcPaymentService.findByArchitect(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateArcPaymentDto: UpdateArcPaymentDto,
  ) {
    return this.arcPaymentService.update(id, updateArcPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.arcPaymentService.remove(id);
  }
}
