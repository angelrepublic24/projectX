/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { ProductImage } from './entities/product-image.entity';
import * as fs from 'fs';
// import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from 'src/cloudinary/constants';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const product = createProductDto;
      const newProduct = await this.productModel.create({
        ...product,
        user,
      });
      return newProduct;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAll() {
    try{
      const products = await this.productModel
      .find()
      .populate('category', '-__v -createdAt')
      .populate({
        path: 'images',
        select: 'url',
      });
    return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new BadRequestException('Could not fetch products');    }
    
  }

  async findUserProducts(userId: string) {
    const product = await this.productModel.find({ user: userId, status: true });
    return product;
  }

  async findOne(term: string) {
    let product: Product;

    if (!product && isValidObjectId(term)) {
      product = await this.productModel
        .findById({_id: term, status: true})
        .populate('category', '-__v -createdAt')
        .populate({
          path: 'images',
          select: 'url',
        });
    }

    if (!product) {
      product = await this.productModel
        .findOne({
          $or: [
            { title: { $regex: new RegExp(term, 'i') }, status: true },
            { description: { $regex: new RegExp(term, 'i')}, status: true },
          ],
        }, )
        .populate('category', '-__v -createdAt')
        .populate({
          path: 'images',
          select: 'url',
        });
    }

    console.log(`Searching for product with term: ${term}`);
    if (!product)
      throw new NotFoundException(
        `Product with id, title, or description${term} not found`,
      );

    return product;
  }

  async findMany(term: string) {
    let products: Product[] = [];
  
    // Primero, busca por ID si es un ObjectId válido
    if (isValidObjectId(term)) {
      products = await this.productModel.find({ _id: term, status: true });
    }
    if (products.length === 0) {
      products = await this.productModel.find({
        name: { $regex: new RegExp(term, 'i') },
        status: true,
      });
    }
      if (products.length === 0) {
      throw new NotFoundException(`No users found for term: ${term}`);
    }
  
    return {
      status: 'success',
      products, // Retorna un array de usuarios
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
        { new: true },
      );

      if (!product) throw new NotFoundException(`product with ${id} not found`);
      return product;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: string) {
    try{
      const product = await this.productModel.findByIdAndUpdate(id, {status:false}, {new: true});
      if (!product) throw new NotFoundException(`product with ${id} not found`);
      return product;
    }catch(err){
      throw new BadRequestException(err);
    }
  }

  async upload(productId: string, files: Express.Multer.File[]){
    try{
      const uploadImages: string[] = [];
      const folderPath = `products/${productId}`;

      for(const file of files){
        const results =  await this.cloudinaryService.uploadMedia([file], folderPath);
        results.forEach((result) => {
          uploadImages.push(result.secure_url)
        })
      }

      const updateProduct = await this.productModel.findOneAndUpdate({_id: productId}, {$addToSet: {images: {$each: uploadImages}}}, {new: true});
      if(!updateProduct) throw new NotFoundException(`Product ${productId} not found`);
      return updateProduct;
    }catch(error){
      throw new BadRequestException(`Could not upload image: ${error.message}`);

    }
  }
}
