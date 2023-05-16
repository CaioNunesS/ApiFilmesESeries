import { Request, Response } from "express";
import { serieRepository } from "../repositories/serie.repository";
import { directorRepository } from "../repositories/directory.repository";

export class serieController {
    async create(req: Request, res: Response) {
        const { title, synopsis, gender, photo, director } = req.body
        const directorId = await directorRepository.findOneBy({ id: director })

        try {
            const newSerie = serieRepository.create({
                title,
                synopsis,
                gender,
                photo,
                director: { id: directorId?.id }
            })
            await serieRepository.save(newSerie)

            return res.status(201).json({ message: "Serie added", data: { ...newSerie, director: directorId } })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const takeAll = await serieRepository.find({
                relations: ["director"]
            })

            return res.status(200).json({ message: takeAll })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async find(req: Request, res: Response) {
        const { serieId } = req.params
        try {
            const serie = await serieRepository.findOne({
                where: { id: serieId }, relations: ["director", "epsodes"]
            })

            if (!serie) return res.status(404).json({ message: "Serie not found" })

            return res.status(200).json(serie)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async update(req: Request, res: Response) {
        const { serieId } = req.params
        const { title, synopsis, gender, photo, director } = req.body

        const directorId = await directorRepository.findOneBy({ id: director })

        try {
            await serieRepository.update({ id: serieId }, { title: title, synopsis: synopsis, gender: gender, photo: photo })
            const upSerie = {
                title: title,
                synopsis: synopsis,
                gender: gender,
                photo: photo,
                director: { id: directorId?.id }
            }
            res.status(200).json({ message: "data updated", data: upSerie })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async exclude(req: Request, res: Response) {
        const { serieId } = req.params

        try {
            await serieRepository.delete({ id: serieId })

            return res.status(200).json({ message: "data deleted" })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}