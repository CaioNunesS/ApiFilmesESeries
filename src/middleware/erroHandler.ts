import { Request, Response, NextFunction } from "express";
import {appError} from "../utils/appError"
    
export const errorHandler = (err: appError, req: Request, res: Response, next: NextFunction) => {
    
    if (err.name === 'appError') 
    return res.status(err.status).json({
        error: err.message,
        stack: err.stack
    });

    return res.status(500).json({
        error: err.message
    });
};