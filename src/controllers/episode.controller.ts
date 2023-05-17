import { Request, Response } from "express";
import { episodeRepository } from "../repositories/episode.repository";
import { serieRepository } from "../repositories/serie.repository";
import { directorRepository } from "../repositories/directory.repository";

export class episodeController {
    async create(req: Request, res: Response) {
        const { title, synopsis, duration, serie, director  } = req.body
        const serieId = await serieRepository.findOneBy({ id: serie })
        const directorId = await directorRepository.findOneBy({ id: director })

        const titleDb = await episodeRepository.findOneBy({title: title})
        if(titleDb) return res.status(400).json({message: "Title duplicated"})

        try {
            const newEpsode = episodeRepository.create({
                title,
                synopsis,
                duration,
                serie: { id: serieId?.id },
                director: { id: directorId?.id }
            })
            await episodeRepository.save(newEpsode)

            return res.status(201).json({ message: "Epsode added", data: { ...newEpsode, serie: serieId, director: directorId } })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const takeAll = await episodeRepository.find({
                relations: ["serie", "director"]
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
            const epsode = await episodeRepository.findOne({
                where: { id: epsodeId }, relations: ["serie", "director"]
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
        const { title, synopsis, duration, serie, director } = req.body

        const serieId = await serieRepository.findOneBy({ id: serie })
        const episodeId = await episodeRepository.findOneBy({ id: epsodeId })
        const directorId = await directorRepository.findOneBy({ id: director })
        
        if(!serieId) return res.status(400).json({message: "serie not found"})
        if(!directorId) return res.status(400).json({message: "director not found"})
        if(!episodeId) return res.status(400).json({message: "episode not found"})

        try {
            await episodeRepository.update({
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
                serie: {id: serieId.title},
                director: { id: directorId?.name }
            }
            res.status(200).json({ message: "data updated", data: upEpsode, })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async exclude(req: Request, res: Response) {
        const { epsodeId } = req.params

        const episodeId = await episodeRepository.findOneBy({ id: epsodeId })

        if(!episodeId) return res.status(400).json({message: "episode not found"})

        try {
            await episodeRepository.delete({ id: epsodeId })

            return res.status(200).json({ message: "data deleted" })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}