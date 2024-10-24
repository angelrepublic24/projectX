/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    // this.transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: 'angelrepublic24@gmail.com',
    //     password: 'almonte2410'
    //   },
    // } as nodemailer.TransportOptions);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      // await this.sendActivationEmail(String(user.email), String(user._id));

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
    return this.userModel.find({ status: true });
  }

  async findOne(term: string) {
    let user: User;
    if (!user && isValidObjectId(term)) {
      user = await this.userModel.findOne({ _id: term, status: true });
    }
    if (!user) {
      user = await this.userModel.findOne({
        name: { $regex: new RegExp(term, 'i') },
        status: true,
      });
    }

    if (!user)
      throw new NotFoundException(`User with id, name or no ${term} not found`);
    return {
      status: 'success',
      user,
    };
  }
  async findMany(term: string) {
    let users: User[] = [];
  
    if (isValidObjectId(term)) {
      users = await this.userModel.find({ _id: term, status: true });
    }
  
    if (users.length === 0) {
      users = await this.userModel.find({
        name: { $regex: new RegExp(term, 'i') },
        status: true,
      });
    }
  
    if (users.length === 0) {
      throw new NotFoundException(`No users found for term: ${term}`);
    }
  
    return {
      status: 'success',
      users, 
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  async update(updateDto: UpdateUserDto, userId: string) {
    try {
      const user = await this.userModel.findOneAndUpdate({_id:userId}, updateDto, {
        new: true,
      });

      if (!user) throw new NotFoundException(`User ${userId} not found`);

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        id,
        { status: false },
        { new: true },
      );
      if (!user) throw new NotFoundException(`User ${id} not found`);

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async uploadAvatar(files: Express.Multer.File[], userId: string) {
    try {
      const uploadAvatar: string[] = [];
      const folderPath = `user/${userId}`;

      for (const file of files) {
        const results = await this.cloudinaryService.uploadMedia([file], folderPath);
        results.forEach((result) => {
          uploadAvatar.push(result.secure_url);
        });

        const updateUser = await this.userModel.findOneAndUpdate(
          { _id: userId },
          { $set: { avatar: uploadAvatar[0] } },
          { new: true },
        );
        if (!updateUser) throw new NotFoundException(`User ${userId} not found`);
        return updateUser;
      }
    } catch (error) {
      throw new BadRequestException(`Could not upload image: ${error.message}`);
    }
  }

  private getToken(payload: any) {
    try {
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private handleExpection(error: any) {
    if (error.code === 11000)
      throw new NotFoundException(
        `User exist in the database ${JSON.stringify(error.keyValue)}`,
      );
  }
}
