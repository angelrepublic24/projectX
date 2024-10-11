/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { v4 as uuid } from 'uuid';
export const MediaNamer = (req: Express.Request, file: Express.Multer.File, cb: Function) => {
    if(!file) return cb(new Error('File not found'), false);
    const mediaExt = file.originalname.split('.')[1];
    const mediaName = `${uuid()}.${mediaExt}`;

    cb(null, mediaName)
}