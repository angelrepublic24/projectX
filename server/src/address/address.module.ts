/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './entities/address.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: Address.name,
      schema: AddressSchema,
    }
    ]), AuthModule
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [MongooseModule]
})
export class AddressModule {}
