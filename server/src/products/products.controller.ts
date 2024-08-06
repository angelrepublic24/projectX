/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from 'src/common/interfaces/valid-roles';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('files', {
    storage: diskStorage({
      destination: './uploads/product/',
      filename: (req, file, cb) => {
        cb(null, "product"+Date.now()+"-" + file.originalname)
      }
    })
  }))
  async uploadMedia (
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>
  ){
    const mediaUpload = await this.productsService.media(id, files);
    return mediaUpload
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
