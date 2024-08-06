/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategory } from './entities/sub-category.entity';
import { Model } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategory>
  ){}
  async create(createSubCategoryDto: CreateSubCategoryDto) {
    try{
      const {category= Category, ...subCategoryDetails} = createSubCategoryDto;
      const subCategory = await this.subCategoryModel.create({...subCategoryDetails, category});
      return subCategory

    }catch(error){
      throw new NotFoundException(error)
    }
    
  }

  async findAll() {
    const subCategories = await this.subCategoryModel.find();
    return subCategories
  }

  findOne(id: number) {
    return `This action returns a #${id} subCategory`;
  }

  update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    return `This action updates a #${id} subCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCategory`;
  }
}
