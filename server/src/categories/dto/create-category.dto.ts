/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    title: string

    // @IsIn([''])
    // title: string;
}
