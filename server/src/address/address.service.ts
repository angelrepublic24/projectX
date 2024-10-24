/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './entities/address.entity';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>
  ){}
  async create(createAddressDto: CreateAddressDto, user: User) {
    try{
      const address = createAddressDto;
      const newAddress = await this.addressModel.create({...address, user});
      return newAddress;
    }catch(error){
      throw new NotFoundException(error);
    }
  }

  async findUserAddress(userId: string) {
    const address = await this.addressModel.find({user: userId, status: true});
    return address;
  }

  async findOne(id: string){
    return await this.addressModel.findOne({_id: id});
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    try{
      const address = await this.addressModel.findOneAndUpdate({_id: id}, updateAddressDto, {new: true});
      if(!address) throw new NotFoundException(`Address ${id} not found`);
      return address
    }catch(error){
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try{
      const address = await this.addressModel.findOneAndUpdate({_id: id}, {status: false}, {new: true});
      if(!address) throw new NotFoundException(`Address ${id} not found`);
      return address
    }catch(error){
      throw new BadRequestException(error);
    }
  }
}
