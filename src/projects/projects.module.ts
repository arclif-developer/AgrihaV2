import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, ProjectSchema } from '../schemas/projects.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { arcprojects, arcprojectsSchema } from '../schemas/arcprojects.schema';
import {
  buildingdetails_tb,
  buildingdetails_tbSchema,
} from '../schemas/buildingdetails.schema';
import { Activitylog, ActivitylogSchema } from '../schemas/activitylog.schema';
import { MailModule } from '../Mailer/mailer.module';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from '../schemas/userSchema';
import {
  SuggestedProduct,
  SuggestedProductSchema,
} from '../schemas/suggestedProduct.schema';

@Module({
  imports: [
    HttpModule,
    MailModule,
    MongooseModule.forFeature(
      [
        { name: Project.name, schema: ProjectSchema },
        { name: arcprojects.name, schema: arcprojectsSchema },
        { name: buildingdetails_tb.name, schema: buildingdetails_tbSchema },
        { name: Activitylog.name, schema: ActivitylogSchema },
        { name: User.name, schema: UserSchema },
        { name: SuggestedProduct.name, schema: SuggestedProductSchema },
      ],
      'AGRIHA_DB',
    ),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
