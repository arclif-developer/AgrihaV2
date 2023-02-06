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
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /// ##################  Product search API ####################### ///
  @Get('search/:searchString')
  searchProducts(@Param('searchString') searchString: string) {
    return this.productService.searchProducts(searchString);
  }
  /// #################### ...................... ##################### ///

  /// ##################  GET ALL PRODUCTS ####################### ///
  @Get('')
  getProducts() {
    return this.productService.getProduct();
  }
  /// #################### ...................... ##################### ///

  /// ################## Sort product by price / value(1 or -1)####################### ///
  @Get('sort/:value')
  sortProduct(@Param('value') value: number) {
    return this.productService.sortProduct(value);
  }
  /// #################### ...................... ##################### ///

  /// ######### Category or subCategory id to find product ################ ///
  @Get('catelogOrSubcatelog/:id')
  catelog_Or_Products(@Param('id') id: string) {
    return this.productService.catelog_Or_Products(id);
  }
  /// #################### ...................... ##################### ///

  // ################## Product id to get details ####################### //
  @Get(':id')
  findSingleProduct(@Param('id') id: string) {
    return this.productService.findSingleProduct(id);
  }
  /// #################### ...................... ##################### ///

  // // ################## GET FACILITY NAME TO FIND PRODUCTS ####################### //
  // @Get('facility/:facilityname')
  // facility_toFindProduct(@Param('facilityname') facilityname: string) {
  //   return this.productService.facility_toFindProduct(facilityname);
  // }
  /// #################### ...................... ##################### ///
}
