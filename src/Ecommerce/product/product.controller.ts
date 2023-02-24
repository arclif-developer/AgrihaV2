import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from '../../utils';
import {
  AddNewProductsDto,
  Req_productDetails,
} from './dto/create-product.dto';
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

  /// ######### CATEGORY or SUBCATEGORY id TO FIND PRODUCTS ################ ///
  @Get('catelogOrSubcatelog/:id')
  catelog_Or_Products(@Param('id') id: string) {
    return this.productService.catelog_Or_Products(id);
  }
  /// #################### ...................... ##################### ///

  // ################## PRODUCT id TO GET DETAILS ####################### //
  @Get(':id')
  findSingleProduct(@Param('id') id: string) {
    return this.productService.findSingleProduct(id);
  }
  /// #################### ...................... ##################### ///

  // // ################## USER REQUEST PRODUCTS  ####################### //
  @Get('add_requests')
  @UseGuards(AuthGuard('jwt'))
  add_requests(
    @Body() req_productDetails: Req_productDetails,
    @GetCurrentUserById() Jwtdata: any,
  ) {
    return this.productService.add_requests(req_productDetails, Jwtdata);
  }
  /// #################### ...................... ##################### ///

  // #########  SELLER / BUSINESS USERS  ADD  NEW PRODUCTS  ############ //

  @Post('add_new_products')
  @UseGuards(AuthGuard('jwt'))
  add_new_products(
    @Body() addNewProductsDta: AddNewProductsDto,
    @GetCurrentUserById() Jwtdata: any,
  ) {
    return this.productService.addNewProduct(addNewProductsDta, Jwtdata);
  }

  /// #################### ...................... ##################### ///
}
