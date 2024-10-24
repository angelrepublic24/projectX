/* eslint-disable prettier/prettier */
import { Controller, Post, UseInterceptors, BadRequestException, Param, Res, Get, Body, UploadedFiles } from '@nestjs/common';
import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MediaFilter } from './helper/mediaFilter.helper';
import { diskStorage } from 'multer';
import { MediaNamer } from './helper/mediaNamer.helper';

import { Response} from 'express';
import { User } from 'src/auth/entities/user.entity';
import { existsSync, mkdirSync } from 'fs';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRoles } from '../interfaces/valid-roles';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService, private readonly cloudinaryService: CloudinaryService) {}

  // @Post(':entityType/:entityId')
  // @Auth(ValidRoles.root)
  // @UseInterceptors(FilesInterceptor('media', 10 ,
  //   {
  //   fileFilter: MediaFilter,
  //   storage: null
  //   // storage: diskStorage({
  //   //   destination: (req, file, cb) => {
  //   //     const entityType = req.params.entityType;
  //   //     const user: User = req.user as User;
  //   //     if (!user || !user._id) {
  //   //       throw new BadRequestException('User not found or not authenticated');
  //   //     }
  //   //     const userId = user._id;
  //   //     const folderPath = `./static/${entityType}/${userId}`;

  //   //     if(!existsSync(folderPath)){
  //   //       mkdirSync(folderPath, {recursive: true});
  //   //     }

  //   //     cb(null, folderPath);
  //   //   },
  //   //   filename: MediaNamer
  //   // })
  // }))
  // async uploadMedia(
  //   @Param('entityType') entityType: string,
  //   @Param('entityId') entityId: string,
  //   @UploadedFiles() media: Array<Express.Multer.File>,
  //   @Body() body: {mediaField?: string},
  //   @GetUser() user: User
  // ){
  //   console.log(media)
  //   if(!media || media.length === 0) throw new BadRequestException('Make sure the file is an image or video');

  //   const userId = user._id as string;

  //   const uploadMedia = await this.cloudinaryService.uploadMedia(media, entityType, userId)
  //   const mediaUrls = uploadMedia.map(result => result.secure_url);
  //   // const mediaPaths = media.map(file => `${entityType}/${user._id}/${file.filename}` );
  //   const updateEntity = await this.mediaService.saveMedia(entityType, entityId, mediaUrls, body.mediaField || 'images');
  //     return{
  //       message: 'File uploaded successfully',
  //       entity: updateEntity,
  //       mediaUrls
  //     }

  // }

  @Get('product/:mediaName')
  findOne(
    @Res() res: Response,
    @Param('mediaName') mediaName: string
  ){
    const path = this.mediaService.getStaticMedia(mediaName, 'product');
    res.sendFile(path);
  }

}
