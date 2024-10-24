/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');


@Injectable()
export class CloudinaryService {
  async uploadMedia(files: Express.Multer.File[], folderPath: string): Promise<UploadApiResponse[]>{
    const uploadResults: UploadApiResponse[] = [];

    for (const file of files) {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder:  folderPath},
          (error: UploadApiErrorResponse, result: UploadApiResponse) => {
            if (error) {
              reject(new InternalServerErrorException('Image upload failed'));
            } else {
              resolve(result);
            }
          }
        ).end(file.buffer);
      });

      uploadResults.push(result);
    }

    return uploadResults;
  }
}
