import { NextFunction, Request, Response } from "express";

export const validate = (schemaName: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const isValid = schemaName.validate(req.body)
        // console.log('isValid.error.details ===>',isValid.error.details[0].message);
        if (!isValid.error) return next()

        const errorDetails = isValid.error.details.map((detail: any) => {
            const errorMessage = detail.message.replace(/["\\]/g, "");
            console.log('error msg ===>', errorMessage);
            return errorMessage.charAt(0).toUpperCase() + errorMessage.substring(1)
        });
        console.log('errorDetails ===>', errorDetails);

        return res.status(400).json({ message: 'ValidationError', details: errorDetails[0] });
    }
}