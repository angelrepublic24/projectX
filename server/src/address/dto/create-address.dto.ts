/* eslint-disable prettier/prettier */
import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateAddressDto {

    @IsPhoneNumber()
    phone: string

    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    address2: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @IsString()
    zip: string;
}
