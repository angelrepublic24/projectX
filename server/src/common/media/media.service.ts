/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { User } from 'src/auth/entities/user.entity';
import { ProductImage } from 'src/products/entities/product-image.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class MediaService {
  private readonly entityModels: Record<string, Model<any>>;

  constructor(
    @InjectModel(ProductImage.name) private readonly productImageModel: Model<ProductImage>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    this.entityModels = {
      product: this.productModel,
      user: this.userModel,
      productImage: this.productImageModel
    };
  }

  getStaticMedia(mediaName: string, folder: string) {
    const path = join(__dirname, `../../../static/${folder}`, mediaName);
    if (!existsSync(path))
      throw new BadRequestException(
        `the media ${mediaName} does not exist in the folder ${folder}`,
      );

    return path;
  }

  async uploadMedia(entityType: string, id: string, imagePath: string[], mediaField: string) {
    try {
      const model = this.entityModels[entityType];

      const uploadProduct = await model.findOneAndUpdate(
        { _id: id },
        { [mediaField]: imagePath },
        { new: true },
      );
      if (!uploadProduct)
        throw new NotFoundException(`${entityType} not found`);

      return uploadProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async saveMedia(entityType: string, entityId: string, mediaPaths: string[], mediaField: string) {
    let model: Model<any>;
    
    // Determina qué modelo usar según el entityType
    switch (entityType) {
      case 'product':
        model = this.productImageModel;
        break;
      case 'user':
        model = this.userModel;
        break;
      default:
        throw new BadRequestException(`Entity type '${entityType}' not supported`);
    }

    const savedImages = await Promise.all(mediaPaths.map(async (path) => {
      const image = new model();
      image.url = path;

      if (entityType === 'product') {
        image.product = entityId; 

      } 

      return await image.save();
    }));
    if (entityType === 'product') {
      await this.productModel.findOneAndUpdate(
        { _id: entityId },
        { $addToSet: { images: { $each: savedImages.map(img => img._id) } } }, // Agrega los IDs de las imágenes
        { new: true } // Devuelve el documento actualizado
      );
    }
  
    return savedImages; 
    
  }
}
