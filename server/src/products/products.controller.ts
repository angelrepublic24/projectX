/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ValidRoles } from 'src/common/interfaces/valid-roles';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.superUser, ValidRoles.root)
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User
  ) {
    return  this.productsService.create(createProductDto, user)
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':term')
  async findOne(
    @Param('term') term: string)
  {
    try{
      return await this.productsService.findOne(term);
    }catch(error){
      throw new NotFoundException(`Product not found with term ${term}`);
    }
  }

  @Get('find/:term')
  async findMany(
    @Param('term') term: string)
  {
    try{
      return await this.productsService.findMany(term);
    }catch(error){
      throw new NotFoundException(`Product not found with term ${term}`);
    }
  }

  @Get('user/:userId')
  findUserProducts(@Param('userId') userId: string){
    return this.productsService.findUserProducts(userId);
  }

  @Patch(':id')
  @Auth(ValidRoles.superUser, ValidRoles.root)
  update(
    @Param('id') id: string, 
    @GetUser() user: User,
    @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Auth(ValidRoles.superUser, ValidRoles.root)
  @Post(':id/upload')
  @UseInterceptors(FilesInterceptor('file'))
  async upload(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[]
  ){
    if(!files || files.length === 0) throw new BadRequestException('no files to upload');

    const uploadMedia = await this.productsService.upload(id, files);
    return uploadMedia;
  }
}
