import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { CreateAdminProductDto } from './dto/create-admin-product.dto';
import { UpdateAdminProductDto } from './dto/update-admin-product.dto';

@Controller('admin-product')
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}

  @Post()
  create(@Body() createAdminProductDto: CreateAdminProductDto) {
    return this.adminProductService.create(createAdminProductDto);
  }

  @Get()
  findAll() {
    return this.adminProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminProductDto: UpdateAdminProductDto) {
    return this.adminProductService.update(+id, updateAdminProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminProductService.remove(+id);
  }
}
