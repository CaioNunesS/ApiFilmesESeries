import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../repositories/user.repository';

export const isAdministrator = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.id
    const admin = await userRepository.findOneBy({id: id});

    if (!admin) return res.status(401).json({ message: "unauthorized" });
    if(admin.isAdmin === false) return res.status(401).json({ message: "unauthorized" })
    return next();

}