import { ObjectId } from 'mongoose';

export class CreateProjectDto {
  creator: any;
  project_type: string;
  project_name: string;
  projectsub_type: any;
  project_type_details: any;
  starting_date: string;
  ending_date: string;
  status: string; //project accept
  architect_id: any;
  bid: boolean; //for all architect
  plan_id: any;
  plan_services: any;
  thumbnail: any;
  requirement_list: any;
}

export class CreateArcProjectDto {
  architect_id: import('mongoose').Types.ObjectId;
  projectname: string;
  location: string;
  Image: any;
  projectarea: any;
  thumbnail: any;
  category: any;
  project_type: string;
  description: string;
  hashtag: string;
}

export class CreateActivitylogDto {
  user: import('mongoose').Types.ObjectId;
  activity: string;
  //project added
  //review added
  //scheduled site visits
  ref: import('mongoose').Types.ObjectId;
  architect_id: any;
  schedule: any;
}
export class projectMailDto {
  id: ObjectId;
}

export class Datalist {
  requirmentlist: any = [
    'Kids bedroon',
    'Courtyard',
    'Libary',
    'Varanda',
    'Game room',
    'Dining room',
    'Prayer room',
    'Store room',
    'Theatre room',
    'Home office',
    'Laundry area',
    'Study room',
    'Library',
    'Servant room',
    'Garage',
    'Deck',
    'Swimming pool',
    'Basement',
    'Waterbody',
    'Patio',
    'Formal living',
    'Sitout',
    'Elevator',
    'Porch',
  ];
}

export class AddProductDto {
  project_id: ObjectId;
  facility_name: string;
  stage: string;
  products_per_facility: Object[];
}

export class SelectProductDto {
  id: ObjectId;
}
