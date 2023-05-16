import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";
import { appError } from "../utils/appError";
import { Request } from "express";


export const discStorage = multer.diskStorage({
    destination: resolve(__dirname, '..', '..', './photoUploads'),
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
        crypto.randomBytes(16, function (err, raw) {
            if (err) cb(err)            

            cb(null, `${raw.toString('hex')}${Date.now()}.${file.originalname.split('.').pop()!.trim()}`
            )
        });
    }
});

export const limits = {
    fileSize: parseInt(process.env.FILE_UPLOAD_SIZE_IN_BYTES!)
}

export const imageFileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
        return cb(
            new appError('Only jpg,jpeg,png formats are allowed', 422)
        );
    }
    cb(null, true);
}

