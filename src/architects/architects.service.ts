import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { architects, architectsDocument } from '../schemas/architects.schema';
import { register, registerDocument } from '../schemas/register.schema';
import { CreateArchitectDto, RegisterDto } from './dto/create-architect.dto';
import { UpdateArchitectDto } from './dto/update-architect.dto';

@Injectable()
export class ArchitectsService {
  constructor(
    @InjectModel(architects.name, 'AGRIHA_DB')
    private architectsModel: Model<architectsDocument>,
    @InjectModel(register.name, 'AGRIHA_DB')
    private registerModel: Model<registerDocument>,
  ) {}

  async create(createArchitectDto: CreateArchitectDto, userId: any) {
    if (userId) {
      console.log(createArchitectDto);
      let registerdto: RegisterDto;
      let message: any;
      let datasave: any;
      let rol: any;

      // eslint-disable-next-line prefer-const
      registerdto = {
        phone: createArchitectDto.phone,
        name: createArchitectDto.firstname,
        email: createArchitectDto.email,
        status: true,
        role: 'architect',
      };

      const registerdataa = await this.registerModel.find({
        phone: registerdto.phone,
      });

      console.log('registerdataa', registerdataa);

      const dataa = registerdataa?.map(async (data) => {
        rol = data.role;
        return data;
      });

      console.log(rol);

      if (rol == 'architect') {
        message = 'architect already exists';
      } else {
        const registerdata = await new this.registerModel(registerdto).save();
        createArchitectDto.registered_id = registerdata._id;

        datasave = await new this.architectsModel(createArchitectDto).save();
        message = 'Architects data added';
      }
      return { status: 200, data: datasave, message: message };
    } else {
      return { status: 404, message: 'Architects data adding failed' };
    }
  }

  async findAll(req) {
    try {
      const limit = 5;
      const page = parseInt(req.query.page) || 1;
      const data = this.architectsModel
        .find({})
        .populate('registered_id')
        .skip((page - 1) * limit)
        .limit(limit);
      if (!data) throw new NotFoundException();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  dashboard_view() {
    try {
      return this.architectsModel.find({}).populate('registered_id');
    } catch (error) {
      return error;
    }
  }

  //find single architects
  async findOne(id: ObjectId): Promise<architects> {
    return this.architectsModel
      .findById({ _id: id })
      .populate('registered_id')
      .exec();
  }

  async update(id: ObjectId, updateArchitectDto: UpdateArchitectDto) {
    const user = await this.architectsModel.findByIdAndUpdate(id, {
      $set: updateArchitectDto,
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async remove(id: ObjectId) {
    const architect = await this.architectsModel.findById({ _id: id }).exec();
    const deletearcregister = await this.registerModel
      .findByIdAndRemove({ _id: architect.registered_id })
      .exec();
    return this.architectsModel.findByIdAndRemove(id).exec();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getProjectsdata(id: ObjectId) {}
}
