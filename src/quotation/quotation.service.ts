import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateActivitylogDto,
  CreateQuotationDto,
} from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { quotation, quotationDocument } from '../schemas/quotation.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  Activitylog,
  ActivitylogDocument,
} from '../schemas/activitylog.schema';
import { Model, ObjectId } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/projects.schema';
import { SnsService } from '../sns/sns.service';
import { MailService } from '../Mailer/mailer.service';
import { architects, architectsDocument } from '../schemas/architects.schema';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Project.name, 'AGRIHA_DB')
    private projectModel: Model<ProjectDocument>,
    @InjectModel(quotation.name, 'AGRIHA_DB')
    private quotationModel: Model<quotationDocument>,
    @InjectModel(Activitylog.name, 'AGRIHA_DB')
    private ActivitylogModel: Model<ActivitylogDocument>,
    @InjectModel(architects.name, 'AGRIHA_DB')
    private ArchitectsModel: Model<architectsDocument>,
    private SNSSERVICE: SnsService,
    private MailerService: MailService,
  ) {}

  async create(createQuotationDto: CreateQuotationDto) {
    try {
      const datasave = await new this.quotationModel(createQuotationDto).save();
      const architectDta = await this.ArchitectsModel.findOne({
        _id: createQuotationDto.architect_id,
      }).populate('registered_id');
      const projectResponse = await this.projectModel
        .findOne({ _id: createQuotationDto.project_id })
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .exec();
      let createActivitylog: CreateActivitylogDto;
      // eslint-disable-next-line prefer-const
      createActivitylog = {
        user: projectResponse.creator,
        activity: 'Quotation received from architects',
        //project added
        //review added
        //scheduled site visits
        ref: datasave._id,
        architect_id: createQuotationDto.architect_id,
        schedule: null,
      };
      const activity = await new this.ActivitylogModel(
        createActivitylog,
      ).save();
      // console.log('project quote:', datasave);
      const IsArchitectId = await this.projectModel
        .findOne({
          $and: [
            { _id: createQuotationDto.project_id },
            { acceptQuotes: { $in: [createQuotationDto.architect_id] } },
          ],
        })
        .exec();
      if (!IsArchitectId) {
        await this.projectModel.updateOne(
          { _id: createQuotationDto?.project_id },
          { $push: { acceptQuotes: createQuotationDto?.architect_id } },
        );
      }
      // SENT SMS MESSAGES NOTIFICATION
      // this.SNSSERVICE.SmsNotification('Quotation received from architects');
      // ==========  END  ============ //

      // WHATSAPP NOTIFICATION
      // this.SNSSERVICE.SmsNotification('Quotation received from architects');
      // ==========  END  ============ //

      // MAIl NOTIFICATION
      this.MailerService.quotationNotification(
        architectDta,
        projectResponse,
        createQuotationDto.quote,
      );
      // ==========  END  ============ //
      return {
        status: 200,
        data: datasave,
        message: 'project choosen Data added',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findAll() {
    return this.quotationModel.find().exec();
  }

  //projectid pass by value
  async findOne(id: ObjectId) {
    try {
      const biddata = await this.quotationModel
        .find({ project_id: id })
        .populate({
          path: 'user_id',
          populate: {
            path: 'registered_id',
          },
        })
        .populate({
          path: 'architect_id',
          populate: {
            path: 'registered_id',
          },
        })
        .sort({ quote: 1 })
        .exec();
      const count = await this.quotationModel
        .find({ project_id: id })
        .countDocuments();
      return {
        status: 200,
        data: biddata,
        count: count,
        message: 'Project bid ,count',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: ObjectId, updateQuotationDto: UpdateQuotationDto) {
    try {
      const user = await this.quotationModel.findByIdAndUpdate(id, {
        $set: updateQuotationDto,
      });
      await this.projectModel.findByIdAndUpdate(user.project_id, {
        $set: updateQuotationDto,
      });
      if (!user) {
        throw new NotFoundException();
      }
      await this.ActivitylogModel.create({
        user: updateQuotationDto.user_id,
        activity: 'Quotation Accepted',
        ref: updateQuotationDto.project_id,
        architect_id: updateQuotationDto.architect_id,
        schedule: null,
      });
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  testsms() {
    this.SNSSERVICE.whatsAppNotification();
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} quotation`;
  }
}
