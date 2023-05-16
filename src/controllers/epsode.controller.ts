import { Request, Response } from "express";
import { epsodeRepository } from "../repositories/epsode.repository";
import { serieRepository } from "../repositories/serie.repository";

export class epsodeController {
    async create(req: Request, res: Response) {
        const { title, synopsis, duration, serie } = req.body
        const serieId = await serieRepository.findOneBy({ id: serie })

        try {
            const newEpsode = epsodeRepository.create({
                title,
                synopsis,
                duration,
                serie: { id: serieId?.id }
            })
            await epsodeRepository.save(newEpsode)

            return res.status(201).json({ message: "Epsode added", data: { ...newEpsode, serie: serieId } })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const takeAll = await epsodeRepository.find({
                relations: ["serie"]
            })

            return res.status(200).json({ message: takeAll })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async find(req: Request, res: Response) {
        const { epsodeId } = req.params
        try {
            const epsode = await epsodeRepository.findOne({
                where: { id: epsodeId }, relations: ["serie"]
            })

            if (!epsode) return res.status(404).json({ message: "Epsode not found" })

            return res.status(200).json(epsode)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async update(req: Request, res: Response) {
        const { epsodeId } = req.params
        const { title, synopsis, duration, serie } = req.body

        const serieId = await serieRepository.findOneBy({ id: serie })

        try {
            await epsodeRepository.update({
                id: epsodeId
            },
                {
                    title: title,
                    synopsis: synopsis,
                    duration: duration
                })
            const upEpsode = {
                title: title,
                synopsis: synopsis,
                duration: duration,
                director: { id: serieId?.id }
            }
            res.status(200).json({ message: "data updated", data: upEpsode })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async exclude(req: Request, res: Response) {
        const { epsodeId } = req.params

        try {
            await epsodeRepository.delete({ id: epsodeId })

            return res.status(200).json({ message: "data deleted" })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}