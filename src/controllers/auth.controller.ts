import "dotenv/config"
import "reflect-metadata"
import { User } from "../entities/User.model"
import Jwt from "jsonwebtoken"
import { Response, Request } from "express"
import { userRepository } from "../repositories/user.repository"
import bcrypt from "bcrypt"

export class authController {
    async login(req: Request, res: Response) {

        const {email, password} = req.body
        // const secret = process.env.JWT_SECRET
        let userEmail = await userRepository.findOneBy({ email: email })
        if (!userEmail) return res.status(404).json({ message: 'Invalid username/password' });

        const isMatch = await bcrypt.compare(password, userEmail.password );

        if (!isMatch) return res.status(401).json({ message: 'Invalid username/password' });

        let token = Jwt.sign({ sub: User.prototype.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.json({
            data: {
                token
            }
        });
    }

    async profile(req: Request, res: Response){

        const id = req.id
        let user = await userRepository.findOne({where: { id: id }, select: ["id", "email", "name"]});


    return res.json({ data: { user} });
    }
}
