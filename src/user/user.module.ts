import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '../schemas/userSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../schemas/projects.schema';
import { MailModule } from '../Mailer/mailer.module';
import { Fileupload, FileuploadSchema } from '../schemas/fileupload.schema';
import { register, registerSchema } from '../schemas/register.schema';
import { business, businessSchema } from '../schemas/businessDetails.schema';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: Project.name, schema: ProjectSchema },
        { name: Fileupload.name, schema: FileuploadSchema },
        { name: register.name, schema: registerSchema },
        { name: business.name, schema: businessSchema },
      ],
      'AGRIHA_DB',
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
