/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param,} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/common/interfaces/valid-roles';


@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(ValidRoles.root)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

}
