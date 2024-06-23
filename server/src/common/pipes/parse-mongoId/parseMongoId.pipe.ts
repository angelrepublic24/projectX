/* eslint-disable prettier/prettier */
import { ArgumentMetadata, PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform{
    transform(value: string, metadata: ArgumentMetadata) {
        if(!isValidObjectId(value)){
            throw new BadRequestException(`${value} is not a valid Mongo ID`)
        }
        return value.toUpperCase()
    }
}