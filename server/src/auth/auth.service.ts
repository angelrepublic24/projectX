/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, isValidObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.validateEmail(user.email);

      return {
        status: 'success',
        user,
        token: this.getToken({ _id: user._id }),
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(term: string) {
    let user: User;
    if (!user) {
      user = await this.userModel.findOne({
        name: term.toLocaleLowerCase(),
      });
    }
    if (!user && isValidObjectId(term)) {
      user = await this.userModel.findOne({ _id: term });
    }

    if (!user)
      throw new NotFoundException(`User with id, name or no ${term} not found`);

    console.log(user);
    return {
      status: 'success',
      user,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, username, password } = loginUserDto;
    const user = await this.userModel
      .findOne({
        $or: [{ email }, { username }],
      })
      .select({ email: true, password: true, username: true, _id: true });
    if (!user)
      throw new UnauthorizedException(
        'Credential are not valid (email) or username',
      );

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credential are not valid (password)');

    if (user.status == false)
      throw new UnauthorizedException('User is inactive');

    return {
      user,
      token: this.getToken({
        _id: user.id,
      }),
    };
  }

  private getToken(payload: any) {
    try {
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validateEmail(email: string): Promise<void> {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'email@gmail.com',
        pass: 'password',
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Email confirmation',
      text: 'Thanks for create an user with us, Please confirm your email by clicking the following link: [Confirmation Link]',
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new BadRequestException(error);
      } else {
        console.log(info.response);
      }
    });
  }

  private handleExpection(error: any) {
    if (error.code === 11000)
      throw new NotFoundException(
        `User exist in the database ${JSON.stringify(error.keyValue)}`,
      );
  }
}
