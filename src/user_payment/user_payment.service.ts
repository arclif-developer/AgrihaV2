import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  Payment_user,
  Payment_userDocument,
} from '../schemas/payment_user.schema';
import { CreateUserPaymentDto } from './dto/create-user_payment.dto';
import { UpdateUserPaymentDto } from './dto/update-user_payment.dto';

@Injectable()
export class UserPaymentService {
  constructor(
    @InjectModel(Payment_user.name, 'AGRIHA_DB')
    private payment_userModel: Model<Payment_userDocument>,
  ) {}

  async create(createUserPaymentDto: CreateUserPaymentDto) {
    try {
      console.log(createUserPaymentDto);
      const datasave = await new this.payment_userModel(
        createUserPaymentDto,
      ).save();

      return {
        status: 200,
        data: datasave,
        message: 'user Payment Data added',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAll() {
    try {
      var userplandata = await this.payment_userModel
        .find({})
        .populate({
          path: 'project_id',
          populate: {
            path: 'architect_id',
          },
        })
        .populate('payment_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .exec();

      return {
        status: 200,
        data: userplandata,
        message: 'payment data of user',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findOne(id: ObjectId) {
    try {
      var userpaymentdata = await this.payment_userModel
        .find({ _id: id })
        .populate({
          path: 'project_id',
          populate: {
            path: 'architect_id',
          },
        })
        .populate('payment_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .exec();

      return {
        status: 200,
        data: userpaymentdata,
        message: 'payment data of user',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //view based on project

  async findbyproject(id: ObjectId) {
    try {
      var userpaymentdata = await this.payment_userModel
        .find({ project_id: id })
        .populate({
          path: 'project_id',
          populate: {
            path: 'architect_id',
            populate: {
              path: 'registered_id',
            },
          },
        })
        .populate('payment_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .exec();

      return {
        status: 200,
        data: userpaymentdata,
        message: 'payment data of project',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //view based on creator

  async findbycreator(id: ObjectId) {
    try {
      var userpaymentdata = await this.payment_userModel
        .find({ creator: id })
        .populate({
          path: 'project_id',
          populate: {
            path: 'architect_id',
          },
        })
        .populate('payment_id')
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .exec();

      return {
        status: 200,
        data: userpaymentdata,
        message: 'payment data of user',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: ObjectId, updateUserPaymentDto: UpdateUserPaymentDto) {
    try {
      const user = await this.payment_userModel.findByIdAndUpdate(id, {
        $set: updateUserPaymentDto,
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
    return this.payment_userModel.findByIdAndDelete(id).then(() => {
      return 'deleted';
    });
  }
}
