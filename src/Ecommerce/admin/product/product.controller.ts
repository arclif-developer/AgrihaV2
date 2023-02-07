import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateCategoryDto,
  CreateProductDto,
  CreateSubCategoryDto,
  CreateSub_SubCategoryDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from 'mongoose';

@Controller('admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /// ##### Admin create new product category {API} ###### ///
  @Post('new_category')
  create_newCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productService.create_newCategory(createCategoryDto);
  }
  /// ################ ............... ################## ///

  // ########### Create new subcategory {API} ######## //
  @Post('new_subcategory')
  create_newsubcategory(@Body() createSubcategoryDto: CreateSubCategoryDto) {
    return this.productService.create_newSubcategory(createSubcategoryDto);
  }
  /// #################### ...................... ##################### ///

  // ########### Create new sub_subcategory {API} ######## //
  @Post('new_subcategory')
  create_newsub_subcategory(
    @Body() createSub_SubcategoryDto: CreateSub_SubCategoryDto,
  ) {
    return this.productService.create_newsub_subcategory(
      createSub_SubcategoryDto,
    );
  }
  /// #################### ...................... ##################### ///

  /// ########### Get all category {API} ############# ///
  @Get('categories')
  getCategories() {
    return this.productService.get_categories();
  }
  /// ################ ............... ################## ///

  // #### Category id to find subcategory {API} ##### //
  @Get('sub_category/:id')
  subcategories(@Param('id') id: ObjectId) {
    return this.productService.get_subcategories(id);
  }
  /// ################ ............... ################## ///

  // ########### Delete Category {API} ######## //
  @Delete('category/:id')
  DeleteCategory(@Param('id') id: ObjectId) {
    return this.productService.deleteCategory(id);
  }
  /// ################ ............... ################## ///

  /// ############# Add product {API} ################## ///
  @Post('add_product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  /// ########### ................ ################## ///

  // ############### Update product {API} ############## //
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }
  /// ############### ................. ############## ///

  // ##################### Delete Product {API} ################ //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  /// ############### ................. ############## ///
}
