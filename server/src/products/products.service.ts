/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { ProductImage } from './entities/product-image.entity';
import * as fs from 'fs';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,

    // @InjectModel(ProductImage.name)
    // private readonly ImageModel: Model<ProductImage>
  ) {}
  async create(createProductDto: CreateProductDto, user: User) {
    try{
      const {images=[], ...productDetail} = createProductDto;
      // const files = images.map(image => this.ImageModel.create({url: image, product: Product}));
      // const resolvedFile = await Promise.all(files);
      // const fileId = resolvedFile.map(file => file._id)
      
      const product = await this.productModel.create({
        ...productDetail, 
        user,
        images: fileId
      })
      return product 
    
    }catch(error){
      throw new NotFoundException(error)
    }
  }

  async findAll() {
    let products = await this.productModel.find()
    .populate('category', '-__v -createdAt')
    return products
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async media(productId, file: Express.Multer.File){
    if (!file){
      throw new BadRequestException('Requested invalid')
    }

    const fileName = file.originalname;
    const fileSplit = fileName.split('.');
    const fileExt = fileSplit[1];

    if(!['png', 'jpg,', 'jpeg', 'gif'].includes(fileExt)){
      fs.unlink(file.path, (error) => {
        if(error) throw new InternalServerErrorException('Failed to delete invalid file')
      })
      throw new BadRequestException('The extension is not supported')
    }

    try{
      const product = await this.productModel.findByIdAndUpdate(
        {_id: productId},
        {images: file.filename},
        {new: true}
      )
      if(!product) throw new BadRequestException('Product doest not exist')

        return {
          product,
          images: file
        }
    }catch(error){
      throw new InternalServerErrorException(error.message)
    }

  }
}
