import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mode } from 'fs';
import { Model, ObjectId } from 'mongoose';
import { address, addressDocument } from '../../schemas/address.schema';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(address.name, 'AGRIHA_DB')
    private addressModel: Model<addressDocument>,
  ) {}
  async create(createAddressDto: CreateAddressDto, Jwtdata: any) {
    try {
      createAddressDto.user_id = Jwtdata.id;
      const data = await this.addressModel.create(createAddressDto);
      return {
        status: 200,
        message: 'Delivery address added',
        addressDta: data,
      };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async findAll(Jwtdata: any) {
    try {
      const address = await this.addressModel.find({ user_id: Jwtdata.id });
      return { status: 200, data: address };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async update(id: ObjectId, updateAddressDto: UpdateAddressDto) {
    try {
      await this.addressModel.updateOne(
        { _id: id },
        { $set: updateAddressDto },
      );
      return { status: 200, Update: 'Success' };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }

  async remove(id: ObjectId) {
    try {
      await this.addressModel.deleteOne({ _id: id });
      return { status: 200, Delete: 'Success' };
    } catch (error) {
      return { status: 401, error: error.message };
    }
  }
}
