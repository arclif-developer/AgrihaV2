import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mode } from 'fs';
import { Model, ObjectId } from 'mongoose';
import {
  sub_subcategory,
  sub_subcategoryDocument,
} from '../../../schemas/sub_subcategory.schema';
import { Category, CategoryDocument } from '../../../schemas/category.schema';
import { Product, ProductDocument } from '../../../schemas/product.schema';
import {
  subcategory,
  subcategoryDocument,
} from '../../../schemas/subcategory.schema';
import {
  CreateCategoryDto,
  CreateProductDto,
  CreateSubCategoryDto,
  CreateSub_SubCategoryDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Category.name, 'AGRIHA_DB')
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(subcategory.name, 'AGRIHA_DB')
    private subcategoryModel: Model<subcategoryDocument>,
    @InjectModel(Product.name, 'AGRIHA_DB')
    private productModel: Model<ProductDocument>,
    @InjectModel(sub_subcategory.name, 'AGRIHA_DB')
    private sub_subModel: Model<sub_subcategoryDocument>,
  ) {}

  //######################## Add new  product category  #########################//
  async create_newCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const new_category = new this.categoryModel(createCategoryDto);
      await new_category.save().catch((error) => {
        throw new NotAcceptableException(error);
      });
      return { status: 200, message: 'New category added' };
    } catch (error) {
      return error;
    }
  }
  // ##############################...........##################################### //

  //######################## Add new  product sub category  #########################//
  async create_newSubcategory(createsubcategory: CreateSubCategoryDto) {
    try {
      const IsSubcat = await this.subcategoryModel
        .findOne({
          $and: [
            { category_id: createsubcategory.category_id },
            { subCategory_name: createsubcategory.subCategory_name },
          ],
        })
        .exec();
      if (IsSubcat) {
        throw new ConflictException('Already taken');
      }
      const new_subcat = new this.subcategoryModel(createsubcategory);
      await new_subcat.save().catch((error) => {
        throw new NotAcceptableException(error);
      });
      return { status: 200, message: 'New subcategory added' };
    } catch (error) {
      return error;
    }
  }
  // ##############################...........########################################## //

  //######################## getting product category  #########################//
  async get_categories() {
    try {
      const data = await this.categoryModel.find({}).exec();
      if (data) {
        return { stauts: 200, category: data };
      } else {
        throw new NotFoundException();
      }
    } catch (error) {
      return error;
    }
  }
  // ##############################...........##################################### //

  //######################## getting product subcategory  #########################//
  async get_subcategories(id: ObjectId) {
    try {
      const data = await this.subcategoryModel.find({
        category_id: id,
      });
      return { status: 200, subcategories: data };
    } catch (error) {}
  }
  // ##############################...........##################################### //

  //#############################  Delete category  #################################//
  async deleteCategory(id: ObjectId) {
    try {
      const deleteCategory = await this.categoryModel.deleteOne({ _id: id });
      const deleteSubcategory = await this.subcategoryModel.deleteMany({
        category_id: id,
      });
      if (
        deleteCategory.deletedCount === 1 &&
        deleteSubcategory.deletedCount === 1
      ) {
        return { status: 200, Message: 'Category deleted' };
      } else {
        throw new NotAcceptableException();
      }
    } catch (error) {
      return error;
    }
  }
  // ##############################...........##################################### //

  // ############################ Add new product  ################################# //
  async create(createProductDto: any) {
    try {
      const newProduct = new this.productModel(createProductDto);
      const response_dta = await newProduct.save().catch((error) => {
        console.log(error);
        if (error) {
          throw new NotAcceptableException();
        }
      });
      return { status: 200, data: response_dta };
    } catch (error) {
      return error;
    }
  }
  // ##############################...........##################################### //

  // ############################ Update products  ################################# //
  async update(id: any, updateProductDto: UpdateProductDto) {
    try {
      const update_response = await this.productModel
        .findByIdAndUpdate(id, {
          $set: updateProductDto,
        })
        .catch((error) => {
          throw new NotAcceptableException(error);
        });
      if (update_response) {
        return { status: 200, message: 'Product data updated successfully' };
      }
    } catch (error) {
      return error;
    }
  }
  // ##############################...........##################################### //

  // ############################ Delete products  ################################# //
  async remove(id: string) {
    try {
      const response = await this.productModel
        .deleteOne({ _id: id })
        .catch((error) => {
          throw new NotAcceptableException(error);
        });
      if (response.deletedCount > 0) {
        return { status: 200, message: 'Product deleted successfully' };
      } else {
        throw new NotFoundException('Product deletion failed');
      }
    } catch (error) {
      return error;
    }
  }
  // ##############################...........##################################### //

  //######################## Add new  product sub sub category  #########################//
  async create_newsub_subcategory(
    createSub_SubcategoryDto: CreateSub_SubCategoryDto,
  ) {
    try {
      const resp = await this.sub_subModel.create(createSub_SubcategoryDto);
      return {
        status: 200,
        message: 'Sub-Sub category created successfully',
        data: resp,
      };
    } catch (error) {
      return error;
    }
  }
  // ##############################...........##################################### //
}
