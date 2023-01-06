import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Payment, PaymentDocument } from '../schemas/payment.schema';
import { CreateArcPaymentDto } from './dto/create-arc_payment.dto';
import { UpdateArcPaymentDto } from './dto/update-arc_payment.dto';

@Injectable()
export class ArcPaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createArcPaymentDto: CreateArcPaymentDto) {
    try {
      console.log(createArcPaymentDto);
      const datasave = await new this.paymentModel(createArcPaymentDto).save();

      return { status: 200, data: datasave, message: 'Payment Data added' };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAll() {
    try {
      var arcplandata = await this.paymentModel
        .find({})
        .populate('architect_id')
        .exec();

      return {
        status: 200,
        data: arcplandata,
        message: 'plan data of architect',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: ObjectId) {
    try {
      var arcplandata = await this.paymentModel
        .find({ _id: id })
        .populate('architect_id')
        .exec();

      return {
        status: 200,
        data: arcplandata,
        message: 'payment data of architect',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //find by architect
  async findByArchitect(id: ObjectId) {
    try {
      var arcplandata = await this.paymentModel
        .find({ architect_id: id })
        .populate('architect_id')
        .exec();

      return {
        status: 200,
        data: arcplandata,
        message: 'payment data of architect',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: ObjectId, updateArcPaymentDto: UpdateArcPaymentDto) {
    try {
      const user = await this.paymentModel.findByIdAndUpdate(id, {
        $set: updateArcPaymentDto,
      });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async remove(id: ObjectId) {
    return this.paymentModel.findByIdAndDelete(id).then(() => {
      return 'deleted';
    });
  }
}
