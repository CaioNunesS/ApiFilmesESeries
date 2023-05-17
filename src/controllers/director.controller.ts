import { Request, Response } from "express";
import { directorRepository } from "../repositories/directory.repository";
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg-protocol'

export class directorController {
  async create(req: Request, res: Response) {
    const { name, dob } = req.body

    if (!name) return res.status(400).json({ message: "Director is required" })
    const nameDb = await directorRepository.findOneBy({ name: name })
    if (nameDb) return res.status(400).json({ message: "Duplicated data" })

    try {
      const newDirector = directorRepository.create({
        name,
        dob
      })
      await directorRepository.save(newDirector)

      return res.status(201).json({ message: newDirector })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const takeAll = await directorRepository.find({})

      if (takeAll.length < 1) return res.status(404).json({ message: "the list is empty" })

      return res.status(200).json({ message: takeAll })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async find(req: Request, res: Response) {
    const { idDirector } = req.params
    try {
      const director = await directorRepository.findOne({ where: { id: idDirector }, relations: ["episode", "movies"] })

      if (!director) return res.status(404).json({ message: "Director not found" })

      return res.status(200).json(director)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async update(req: Request, res: Response) {
    const { idDirector } = req.params
    const { name, dob, } = req.body

    const director = await directorRepository.findOneBy({ id: idDirector })

    if (!director) return res.status(400).json({ message: "director not found" })

    try {
      await directorRepository.update({ id: idDirector }, { name: name, dob: dob })
      const upDirector = {
        name: name,
        dob: dob,
      }
      res.status(200).json({ message: "data updated", data: upDirector })

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async exclude(req: Request, res: Response) {
    const { idDirector } = req.params
    const director = await directorRepository.findOneBy({ id: idDirector })

    if (!director) return res.status(400).json({ message: "director not found" })

    try {
      await directorRepository.delete({ id: idDirector })

      return res.status(200).json({ message: "data deleted" })

    } catch (error) {
      if (error instanceof QueryFailedError) {
        
        const err = error.driverError as DatabaseError;
        if (err.code === '23503') {
          return res.status(500).json({ message: "Was not possible to delete this data. Verify the relations" })
        }
      }
    }
  }
}

