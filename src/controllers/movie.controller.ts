import { Request, Response } from "express";
import { movieRepository } from "../repositories/movie.repository";
import { directorRepository } from "../repositories/directory.repository";

export class movieController {
  async create(req: Request, res: Response) {
    const { title, synopsis, gender, photo, duration, director } = req.body
    const directorId = await directorRepository.findOneBy({ id: director })

    const titleDb = await movieRepository.findOneBy({title: title})
    if(titleDb) return res.status(400).json({message: "Title duplicated"})

    try {
      const newMovie = movieRepository.create({
        title,
        synopsis,
        gender,
        photo,
        duration,
        director: { id: directorId?.id }
      })
      await movieRepository.save(newMovie)

      return res.status(201).json({ message: "Movie added", data: { ...newMovie, director: directorId } })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const takeAll = await movieRepository.find({
        relations: ["director"]
      })

      return res.status(200).json({ message: takeAll })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async find(req: Request, res: Response) {
    const { movieId } = req.params
    try {
      const movie = await movieRepository.findOne({
        where: {id: movieId}, relations: ["director"]
      })

      if (!movie) return res.status(404).json({ message: "Movie not found" })

      return res.status(200).json(movie)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async update(req: Request, res: Response) {
    const { movieId } = req.params
    const { title, synopsis, gender, photo, duration, director } = req.body

    const directorId = await directorRepository.findOneBy({ id: director })
    const movie = await movieRepository.findOneBy({id : movieId})
    const titleBd = await movieRepository.findOneBy({title : title})

    if(titleBd) return res.status(400).json({message: "Duplicated data"})
    if(!directorId) return res.status(400).json({message: "director not found"})
    if(!movie) return res.status(400).json({message: "movie not found"})

    try {
      await movieRepository.update({ id: movieId }, { title: title, synopsis: synopsis, gender: gender, duration: duration, photo: photo })
      const upMovie = {
        title: title,
        synopsis: synopsis,
        gender: gender,
        duration: duration,
        photo: photo,
        director: { id: directorId?.id }
      }
      res.status(200).json({ message: "data updated", data: upMovie })

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" })
    }
  }

  async exclude(req: Request, res: Response) {
    const { movieId } = req.params

    const movie = await movieRepository.findOneBy({id : movieId})
    if(!movie) return res.status(400).json({message: "movie not found"})
    
    try {
      await movieRepository.delete({ id: movieId })

      return res.status(200).json({ message: "data deleted" })

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" })

    }
  }
}