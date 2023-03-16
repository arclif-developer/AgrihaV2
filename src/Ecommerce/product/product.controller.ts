import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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

  // #########  SELLER / BUSINESS USERS ADDED PRODUCTS VIEW ############ //
  @Get('sellers_products_view')
  @UseGuards(AuthGuard('jwt'))
  SellersProductView(@GetCurrentUserById() Jwtdata: any) {
    return this.productService.sellersProductsFn(Jwtdata);
  }
  /// #################### ...................... ##################### ///

  /// ##################  GET ALL PRODUCTS ####################### ///
  @Get()
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
  @Get('details/:id')
  findSingleProduct(@Param('id') id: string, @Query() query: any) {
    return this.productService.findSingleProduct(id, query);
  }
  /// #################### ...................... ##################### ///

  // // ################## USER REQUEST PRODUCTS  ####################### //
  @Post('add_requests')
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

  // // ##################  REQUEST PRODUCTS VIEW ####################### //

  @Get('requestProduct_view')
  requestProducts(@Query() query: any) {
    return this.productService.requestProducts(query);
  }

  /// #################### ...................... ##################### ///

  // // ##################  USER REQUEST PRODUCTS HISTORY ####################### //
  @Get('requestProduct_view')
  @UseGuards(AuthGuard('jwt'))
  userRequestHistory(@GetCurrentUserById() Jwtdata: any) {
    return this.productService.userRequestHistory(Jwtdata);
  }

  /// #################### ...................... ##################### ///

  // // ################## PRODUCTS BRAND  VIEW ####################### //

  @Get('brand_list')
  brandListFn() {
    return this.productService.brandListFn();
  }

  /// #################### ...................... ##################### ///
}
