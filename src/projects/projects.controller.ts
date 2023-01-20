import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  CreateArcProjectDto,
  Datalist,
  projectMailDto,
  AddSuggestedProductDto,
} from './dto/create-project.dto';
import {
  UpdateProjectDto,
  UpdateArcProjectDto,
} from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../utils';
import { ObjectId } from 'mongoose';
import { Request } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addArcProject(@Body() createArcProjectDto: CreateArcProjectDto) {
    return this.projectsService.addArcProject(createArcProjectDto);
  }

  // TRUE BID PROJECTS
  @Get('trueBidProject')
  @UseGuards(AuthGuard('jwt'))
  findTrueBidsProjects() {
    return this.projectsService.findTrueBidsProjects();
  }

  //user choose project
  @Post('Choose_project')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetCurrentUserById() Jwtdta: any,
  ) {
    return this.projectsService.create(createProjectDto, Jwtdta.id);
  }

  //user choose project
  @Patch('Choose_architect/:id')
  @UseGuards(AuthGuard('jwt'))
  choosearchitect(
    @Param('id') id: ObjectId,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.choosearchitect(id, updateProjectDto);
  }

  //view projects of user
  @Get('view')
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetCurrentUserById() Jwtdta: any) {
    return this.projectsService.findAll(Jwtdta?.id);
  }

  //view projects of user
  @Get('bidprojects')
  findbidprojects() {
    return this.projectsService.bidtrueprojects();
  }

  // findAllProjectsType
  @Get('projectsview')
  @UseGuards(AuthGuard('jwt'))
  findAllProjectsType(
    @GetCurrentUserById() Jwtdta: any,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.findAllProjectsType(
      Jwtdta.id,
      createProjectDto,
    );
  }

  @Get('all')
  // @UseGuards(AuthGuard('jwt'))
  findAllproject() {
    return this.projectsService.findAllproject();
  }

  //single project view for user
  @Get('single/:id')
  // @UseGuards(AuthGuard('jwt'))
  findSingleProject(@Param('id') id: ObjectId) {
    return this.projectsService.findSingleProject(id);
  }

  //get all architects projects
  @Post('getallprojects')
  getallArcProject(@Req() req: Request) {
    return this.projectsService.getallArcProject(req);
  }

  //user projects update - accept project (status update: accepted)
  @Patch('accept/:id')
  projectaccept(
    @Param('id') id: ObjectId,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.projectaccept(id, updateProjectDto);
  }

  //single project view for architectsSchema
  //Params architectid
  @Get('singleuserproject/:id')
  // @UseGuards(AuthGuard('jwt'))
  findSingleUserProject(@Param('id') id: ObjectId) {
    return this.projectsService.findSingleUserProject(id);
  }

  //all projects of architect
  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.projectsService.findOne(id);
  }

  //get single arc projects
  @Get('arcprojectsingle/:id')
  findsinglearcproject(@Param('id') id: ObjectId) {
    return this.projectsService.findsinglearcproject(id);
  }

  //architects project update
  @Patch(':id')
  update_arcprojects(
    @Param('id') id: ObjectId,
    @Body() updateArcProjectDto: UpdateArcProjectDto,
  ) {
    return this.projectsService.update_arcprojects(id, updateArcProjectDto);
  }

  //architects project delete
  @Delete(':id')
  arc_remove(@Param('id') id: ObjectId) {
    return this.projectsService.arc_remove(id);
  }

  // architect Project image delete
  @Delete('arc_img/:id')
  arc_image_delete(@Param('id') id: ObjectId, @Body() img_url: any) {
    return this.projectsService.arc_image_delete(id, img_url);
  }

  //user projects update
  @Patch('update/:id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  //user projects save
  @Patch('save/:id')
  saveproject(
    @Param('id') id: ObjectId,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.saveproject(id, createProjectDto);
  }

  //user projects delete
  @Delete('remove/:id')
  remove(@Param('id') id: ObjectId) {
    return this.projectsService.remove(id);
  }

  //bid true projects of user

  @Get('getbid/:id')
  findbidtrue_project_user(@Param('id') id: ObjectId) {
    return this.projectsService.findbidtrue_project_user(id);
  }

  // Add architect suggested products
  @Post('add_products')
  addSuggestedProducts(@Body() addSuggestedProductDto: AddSuggestedProductDto) {
    return this.projectsService.addsuggestedProducts(addSuggestedProductDto);
  }

  // Add suggested products view / params was projectId
  @Get('suggestedProducts/:id')
  findSuggestedProducts(@Param('id') id: ObjectId) {
    return this.projectsService.findSuggestedProducts(id);
  }

  // TRUE BID PROJECTS FOR UNAUTHENTICATED USERS
  @Get('trueBids')
  findTrueBids() {
    return this.projectsService.findTrueBids();
  }

  @Post('mail')
  @UseGuards(AuthGuard('jwt'))
  project_mail(
    @Body() data: projectMailDto,
    @GetCurrentUserById() jwtData: any,
  ) {
    return this.projectsService.project_mail(data, jwtData);
  }

  // @Patch('/updatearcproject')
  // updatearchitectprojects(){
  //   return this.projectsService.updatearchitectprojects();
  // }
}
