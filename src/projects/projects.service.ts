import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import {
  arcprojects,
  arcprojectsDocument,
} from '../schemas/arcprojects.schema';
import {
  buildingdetails_tb,
  buildingdetails_tbDocument,
} from '../schemas/buildingdetails.schema';
import { Project, ProjectDocument } from '../schemas/projects.schema';
import {
  CreateProjectDto,
  CreateArcProjectDto,
  CreateActivitylogDto,
  projectMailDto,
  Datalist,
} from './dto/create-project.dto';
import {
  UpdateProjectDto,
  UpdateArcProjectDto,
} from './dto/update-project.dto';
import {
  Activitylog,
  ActivitylogDocument,
} from '../schemas/activitylog.schema';
import { Requiremntlist } from '../models/Enums/requirementlist';
import { MailService } from '../Mailer/mailer.service';
import { projectDto } from '../user/dto/create-user.dto';
import { User, UserDocument } from '../schemas/userSchema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name, 'AGRIHA_DB')
    private projectModel: Model<ProjectDocument>,
    @InjectModel(arcprojects.name, 'AGRIHA_DB')
    private arcProjectModel: Model<arcprojectsDocument>,
    @InjectModel(buildingdetails_tb.name, 'AGRIHA_DB')
    private buildingdetailsModel: Model<buildingdetails_tbDocument>,
    @InjectModel(Activitylog.name, 'AGRIHA_DB')
    private ActivitylogModel: Model<ActivitylogDocument>,
    private MailerService: MailService,
    @InjectModel(User.name, 'AGRIHA_DB') private userModel: Model<UserDocument>,
  ) {}

  //find single project of user
  async findSingleProject(id: ObjectId) {
    try {
      const data = await this.projectModel
        .find({ _id: id })
        .populate({
          path: 'architect_id',
          populate: {
            path: 'registered_id',
          },
        })
        .populate('creator')
        .populate('plan_id')
        .exec();

      console.log(data);
      const details = await this.buildingdetailsModel
        .find({ project: id })
        .exec();

      return { status: 200, data: data, details: details };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //find single project for architect
  async findSingleUserProject(id: ObjectId) {
    try {
      let dataresp: any = { data: '', details: '' };

      let dataa = await this.projectModel
        .find({ architect_id: id })
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .populate('plan_id')
        .exec()
        .then(async (response) => {
          dataresp.data = response;
          dataresp.details = await this.buildingdetailsModel
            .find({ project: { $in: response } })
            .exec();
        });

      return { status: 200, dataresp };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async projectaccept(id: ObjectId, updateProjectDto: UpdateProjectDto) {
    try {
      const projectdata = await this.projectModel.findByIdAndUpdate(id, {
        $set: updateProjectDto,
      });

      if (!projectdata) {
        throw new NotFoundException();
      }

      return { projectdata: projectdata };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async addArcProject(createArcProjectDto: CreateArcProjectDto) {
    try {
      console.log(createArcProjectDto);
      const datasave = await new this.arcProjectModel(
        createArcProjectDto,
      ).save();

      return { status: 200, data: datasave, message: 'project Data added' };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //get all arc projects
  async getallArcProject(req) {
    try {
      const limit = 16;
      const page = parseInt(req.query.page) || 1;
      const datasave = await this.arcProjectModel
        .find()
        .populate({
          path: 'architect_id',
          populate: {
            path: 'registered_id',
          },
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
      const count = await this.arcProjectModel.find().countDocuments();
      return { status: 200, data: datasave, project_count: count };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //user project creation
  async create(createProjectDto: CreateProjectDto, userId: any) {
    try {
      createProjectDto.creator = new mongoose.Types.ObjectId(userId);
      console.log(createProjectDto);
      let projectCode: any = 'ARC00';
      let proje: any = 0;
      // let projCode = {
      //   res: "ARCR0",
      //   com: "ARCC0",
      //   land: "ARCL0",
      //   int: "ARCI0"
      // }

      // let projectSave: any;
      // let projectCode: any;

      // switch (createProjectDto.project_type) {
      //   case "Residential":
      //     projectCode = `${projCode.res}`;
      //     break;
      //   case "Commercial":
      //     projectCode = `${projCode.com}`;
      //     break;
      //   case "Landscaping":
      //     projectCode = `${projCode.land}`;
      //     break;
      //   case "Interior":
      //     projectCode = `${projCode.int}`;
      //     break;
      // }

      // let pro: any
      // let proje: number = 1
      // projectSave = await this.projectModel.find({ creator: createProjectDto.creator }).then(async (response) => {
      //   response.map((data) => {

      //     if (data.project_type == createProjectDto.project_type) {
      //       pro = data.project_name

      //     } else {
      //       pro = undefined
      //     }

      //   })

      //   if (pro == undefined) {

      //     pro = 0
      //   } else {
      //     pro = pro[pro.length - 1];

      //     pro = pro.slice(-1)

      //   }
      //   proje += parseInt(pro);
      //   createProjectDto.project_name = `${projectCode}` + proje;

      //   const datasave = await new this.projectModel(createProjectDto).save()
      //   return datasave

      // })

      proje += await this.projectModel.find().countDocuments();
      createProjectDto.project_name = `${projectCode}` + proje;

      const datasave = await new this.projectModel(createProjectDto).save();

      console.log(datasave + 'This');

      // console.log(datasave)
      let createActivitylog: CreateActivitylogDto;

      createActivitylog = {
        user: createProjectDto.creator,
        activity: 'project added for you',
        //project added
        //review added
        //scheduled site visits
        ref: datasave._id,
        architect_id: null,
        schedule: null,
      };
      const activity = await new this.ActivitylogModel(
        createActivitylog,
      ).save();

      console.log('projectname:', datasave);

      return {
        status: 200,
        data: datasave,
        message: 'project choosen Data added',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async choosearchitect(id: ObjectId, updateProjectDto: UpdateProjectDto) {
    try {
      const user = await this.projectModel.findByIdAndUpdate(id, {
        $set: updateProjectDto,
      });

      //activitylog
      const filter = await this.ActivitylogModel.findOne({ ref: id })
        .exec()
        .then(async (response) => {
          console.log(response._id);

          const Activitylog = await this.ActivitylogModel.findByIdAndUpdate(
            response._id,
            { $set: updateProjectDto },
          );
        });

      // const Activitylog = await this.ActivitylogModel
      //   .findByIdAndUpdate(filter._id, { $set: { architect: updateProjectDto } })

      // if (!Activitylog) {
      //   throw new NotFoundException();
      // }

      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //get all projects of user
  async findAll(userId) {
    try {
      const id = new mongoose.Types.ObjectId(userId);
      const projects = await this.projectModel
        .find({ creator: id })
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .populate('plan_id')
        .populate('architect_id')
        .catch((error) => {
          console.log(error);
        });

      if (!projects) {
        throw new NotFoundException('user not added any projects');
      }
      return {
        status: 200,
        message: 'user projects ',
        projects: projects,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAllproject() {
    try {
      const projects = await this.projectModel
        .find()
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .populate('plan_id')
        .exec();
      if (!projects) {
        throw new NotFoundException('user not added any projects');
      }
      return {
        status: 200,
        message: 'user projects ',
        projects: projects,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //get all projects of user
  async findAllProjectsType(userId, createProjectDto: CreateProjectDto) {
    try {
      const id = new mongoose.Types.ObjectId(userId);
      const projects = await this.projectModel.find({
        $and: [
          {
            creator: id,
            project_type: createProjectDto.project_type,
          },
        ],
      });
      if (!projects) {
        throw new NotFoundException('user not added any projects');
      }
      return {
        status: 200,
        message: 'user projects ',
        projects: projects,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //get all projects of architect
  //params arch id
  findOne(id: ObjectId): Promise<arcprojects[]> {
    try {
      return this.arcProjectModel
        .find({ architect_id: id })
        .populate('architect_id')
        .exec();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  findsinglearcproject(id: ObjectId): Promise<arcprojects[]> {
    try {
      return this.arcProjectModel
        .find({ _id: id })
        .populate('architect_id')
        .populate({
          path: 'architect_id',
          populate: {
            path: 'registered_id',
          },
        })
        .exec();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //architects projects update
  //project id
  async update_arcprojects(
    id: ObjectId,
    updateArcProjectDto: UpdateArcProjectDto,
  ) {
    try {
      console.log(updateArcProjectDto.Image);

      let user: any;
      user = await this.arcProjectModel.findByIdAndUpdate(
        id,
        {
          $set: {
            projectname: updateArcProjectDto.projectname,
            location: updateArcProjectDto.location,
            Image: updateArcProjectDto.Image,
            projectarea: updateArcProjectDto.projectarea,
            thumbnail: updateArcProjectDto.thumbnail,
            description: updateArcProjectDto.description,
            project_type: updateArcProjectDto.project_type,
          },
        },
        {
          $push: { Image: updateArcProjectDto.Image },
        },
      );
      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //architects projects delete
  //project id
  arc_remove(id: ObjectId) {
    try {
      return this.arcProjectModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //for user projects
  //user projects update
  //project id
  async update(id: ObjectId, updateProjectDto: UpdateProjectDto) {
    try {
      const user = await this.projectModel.findByIdAndUpdate(id, {
        $set: updateProjectDto,
      });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // saveproject
  //for user projects
  //user projects update
  //project id
  async saveproject(id: ObjectId, createProjectDto: CreateProjectDto) {
    try {
      const user = await this.projectModel.findByIdAndUpdate(id, {
        $push: {
          issaved: createProjectDto.creator,
        },
      });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  remove(id: ObjectId) {
    try {
      return this.projectModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //bid true projects

  async bidtrueprojects() {
    try {
      const projects = await this.projectModel
        .find()
        .populate({
          path: 'creator',
          populate: {
            path: 'registered_id',
          },
        })
        .populate('plan_id')
        .exec();
      const bidprojects = projects.filter((res: any) => {
        return res.bid == true;
      });
      console.log(bidprojects);

      if (!projects) {
        throw new NotFoundException('user not added any projects');
      }
      return {
        status: 200,
        message: 'bid projects ',
        projects: bidprojects,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  //bid true projects of user

  async findbidtrue_project_user(id: ObjectId) {
    try {
      const data = await this.projectModel
        .find({ creator: id })
        .exec()
        .then(async (response) => {
          return response.filter((res: any) => {
            return res.bid === true;
          });
        });
      return {
        status: 200,
        data: data,
        message: 'bid true - send to all architects',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  // architect project image remove
  async arc_image_delete(id, imageUrl) {
    try {
      return this.arcProjectModel.updateOne(
        { _id: id },
        { $pull: { Image: imageUrl.url } },
      );
    } catch (error) {
      return error;
    }
  }

  //User's Added project Mailing Notification
  async project_mail(data: projectMailDto, jwtData) {
    try {
      const projectData = await this.projectModel.findOne({ _id: data.id });
      const userdata = await this.userModel.findOne({ _id: jwtData.id });
      const response = await this.MailerService.projectAdded_mail(
        projectData,
        userdata,
      );
      return { status: 200 };
    } catch (error) {
      return error;
    }
  }
  ///////////// end  ///////////////////
  // dele
  //  async updatearchitectprojects(){
  //     let user = await this.arcProjectModel.find().exec()
  //     .then(async (response)=>{

  //      const  updateproject = await this.arcProjectModel.findByIdAndUpdate(response._id,$set{})
  //     })

  //  }
}
