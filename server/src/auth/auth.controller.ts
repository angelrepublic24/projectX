/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UploadedFiles, UseInterceptors, BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto){
    return this.authService.create(createUserDto);
  }


  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }

  @Get()
 async findAll(@Res() res: Response) {
    await this.authService.findAll()
      .then( user => {
        res.status(HttpStatus.OK).json({
          status: 'success',
          user
        })
      })
      .catch(error => {
        return res.status(HttpStatus.NO_CONTENT).json(error)
      })
   
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.authService.findOne(term);
  }

  @Get('find/:term')
  findMany(
    @Param('term') term: string){
      return this.authService.findMany(term)
    }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.authService.remove(id)
  }

  @Auth()
  @Patch('update')
  async update(
    @GetUser() user: User,
    @Body() updateDto: UpdateUserDto
  ){
    const userId = user._id as string;
    const userToUpdate = await this.authService.update(updateDto, userId);
    if(!userToUpdate) throw new NotFoundException(`User ${userId} does not exist`);
    return userToUpdate
  }

  @Auth()
  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([{name: 'file', maxCount: 1}]))
  async upload(
    @UploadedFiles() files: {file?: Express.Multer.File[]},
    @GetUser() user: User
  ){
    if(!files.file || files.file.length === 0 ) throw new BadRequestException('No file uploaded');

    const file = files.file[0];
    const userId = user._id as string;
  
    const updateUser = await this.authService.uploadAvatar([file], userId)
    if (!updateUser) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return {avatarUrl: updateUser.avatar, user}
  }
}
