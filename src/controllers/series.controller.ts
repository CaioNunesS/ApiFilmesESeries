import { Request, Response } from "express";
import { serieRepository } from "../repositories/serie.repository";
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg-protocol'

export class serieController {
    async create(req: Request, res: Response) {
        const { title, synopsis, gender, photo} = req.body

        const titleDb = await serieRepository.findOneBy({title: title})
        if(titleDb) return res.status(400).json({message: "title duplicated"})

        try {
            const newSerie = serieRepository.create({
                title,
                synopsis,
                gender,
                photo
            })
            await serieRepository.save(newSerie)

            return res.status(201).json({ message: "Serie added", data: { ...newSerie } })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const takeAll = await serieRepository.find({ })

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
                where: { id: serieId }, relations: [ "epsodes"]
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
        const { title, synopsis, gender, photo } = req.body

        const serie = await serieRepository.findOneBy({id: serieId}) 

        if(!serie) return res.status(400).json({message: "serie not found"})
        
        try {
            await serieRepository.update({ id: serieId }, { title: title, synopsis: synopsis, gender: gender, photo: photo })
            const upSerie = {
                title: title,
                synopsis: synopsis,
                gender: gender,
                photo: photo
            }
            res.status(200).json({ message: "data updated", data: upSerie })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" })
        }
    }

    async exclude(req: Request, res: Response) {
        const { serieId } = req.params

        
        const serie = await serieRepository.findOneBy({id: serieId}) 
        if(!serie) return res.status(400).json({message: "serie not found"})
        
        try {
            await serieRepository.delete({ id: serieId })

            return res.status(200).json({ message: "data deleted" })

        } catch (error) {
            if (error instanceof QueryFailedError) {
        
                const err = error.driverError as DatabaseError;
                if (err.code === '23503') {
                    return res.status(500).json({ message: "Was not possible to delete this data." })
                }
              }
        }
    }
}