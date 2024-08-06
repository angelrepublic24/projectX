/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

}
