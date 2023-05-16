import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";
import { appError } from "../utils/appError";
import { Request } from "express";


export const discStorage = multer.diskStorage({
    destination: resolve(__dirname, '..', '..', './videoUploads'),
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
        crypto.randomBytes(16, function (err, raw) {
            if (err) cb(err)            

            cb(null, `${raw.toString('hex')}${Date.now()}.${file.originalname.split('.').pop()!.trim()}`
            )
        });
    }
});

export const limits = {
    fileSize: parseInt(process.env.FILE_UPLOAD_VIDEO_SIZE_IN_BYTES!)
}

export const videoFileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (!['video/mp4'].includes(file.mimetype)) {
        return cb(
            new appError('Only mp4 is allowed', 422)
        );
    }
    cb(null, true);
}

