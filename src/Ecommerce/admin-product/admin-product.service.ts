import { Injectable } from '@nestjs/common';
import { CreateAdminProductDto } from './dto/create-admin-product.dto';
import { UpdateAdminProductDto } from './dto/update-admin-product.dto';

@Injectable()
export class AdminProductService {
  create(createAdminProductDto: CreateAdminProductDto) {
    return 'This action adds a new adminProduct';
  }

  findAll() {
    return `This action returns all adminProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminProduct`;
  }

  update(id: number, updateAdminProductDto: UpdateAdminProductDto) {
    return `This action updates a #${id} adminProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminProduct`;
  }
}
