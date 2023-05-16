import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/user.repository";

export class userController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        const userPassword = await bcrypt.genSalt(10).then(salt => { return bcrypt.hash(password, salt) });

        try {
            const newUser = userRepository.create({
                name,
                email,
                password: userPassword
            })
            await userRepository.save(newUser)

            const id = newUser.id

            return res.status(200).json({ message: "User created", id: id, name: name, email: email })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const takeAll = await userRepository.find({ select: ["id", "name", "email"] })

            return res.status(200).json({ message: takeAll })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async find(req: Request, res: Response) {
        const { userId } = req.params
        try {
            const user = await userRepository.findOne({
                where: { id: userId }, select: ["id", "email", "name"]
            })

            if (!user) return res.status(404).json({ message: "User not found" })

            return res.status(200).json(user)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async update(req: Request, res: Response) {
        const { userId } = req.params
        const { name, email } = req.body

        const id = await userRepository.findOneBy({ id: userId })

        if (email && id?.email != email) {

            const userEmail = await userRepository.findOneBy({ email: email })
            if (userEmail) return "email already exists"
        }

        try {
            await userRepository.update({ id: userId }, { name: name ? name : id?.name, email: email ? email : id?.email })
            const upUser = {
                name: name,
                email: email
            }

            res.status(200).json({ message: "data updated", data: upUser })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async exclude(req: Request, res: Response) {
        const { userId } = req.params

        try {
            await userRepository.delete({ id: userId })

            return res.status(200).json({ message: "data deleted" })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })

        }
    }
}