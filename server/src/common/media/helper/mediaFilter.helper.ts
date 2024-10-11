/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */


export const MediaFilter = (req: Express.Request, file: Express.Multer.File, cb: Function ) => {
    if(!file) return cb(new Error('File is empty'), false);

    const mediaExt = file.originalname.split('.')[1];
    const validExt = ['jpg', 'jpeg', 'png', 'gif'];

    if(validExt.includes(mediaExt)){
        return cb(null, true);
    }

    cb(null, false);
}