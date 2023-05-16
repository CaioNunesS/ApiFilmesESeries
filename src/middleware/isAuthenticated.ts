import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authToken: string | undefined = req.headers.authorization;

    if (!authToken) return res.status(401).json({ message: 'Not authorized' });
    const [bearer, token] = authToken.split(' ');

    if (bearer !== 'Bearer'){
        res.status(401).json({ message: 'Badly formated token' });}    

    try {
        const { sub }: any = verify(token, process.env.JWT_SECRET!);
        req.id = sub;

        return next()
    } catch (error) {
        return res.status(401).json({
            message: 'Not authorized'
        });
    }
}