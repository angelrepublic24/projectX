/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { ProductImage } from './entities/product-image.entity';
import * as fs from 'fs';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto, user: User) {
    try{
      const product = createProductDto;  
      const newProduct = await this.productModel.create({
        ...product, 
        user,
      })
      return newProduct 
    
    }catch(error){
      throw new NotFoundException(error)
    }
  }

  async findAll() {
    let products = await this.productModel.find()
    .populate('category', '-__v -createdAt')
    .populate({
      path: 'images',
      select: 'url'
    })
    return products
  }

  async findUserProducts(userId: string){
    const product = await this.productModel.find({user: userId})
    return product;

  }

  async findOne(id: string) {
    const product = await this.productModel.findOne({_id: id})
    .populate('category', '-__v -createdAt')
    .populate({
      path: 'images',
      select: 'url'
    })
    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

}
