import { existsSync, unlinkSync } from "fs";
import { resolve } from "path";
import { Request, Response } from "express";
import { movieRepository } from "../repositories/movie.repository";

export class uploadMoviePhoto{

    async viewImage(req: Request, res: Response){
        const { imageName } = req.params;
        const imagePath = resolve('photoUploads', imageName);
    
        if (!existsSync(imagePath)) return res.status(404).json({ message: "Image not found" });
    
        return res.sendFile(imagePath);
    };
    
    async fileUploadMoviePhoto(req: Request, res: Response) {
        const { movieId } = req.params;
        
        if (!req.file) return res.status(422).json({ message: "Please select a file" });
        
        const getMovieId: any = await movieRepository.findOneBy({id: movieId});
        
        if(!getMovieId) return res.status(404).json({message: "Movie not found"})

        const {title, photo} = getMovieId
        const moviePhoto = `${process.env.URL_IMAGE}/${req.file.filename}`
        
        const movie = {title, photo}
    try {
        await movieRepository.update({id: movieId}, {photo: moviePhoto})
    
        return res.json({ data: movie });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: "Internal server error" })
    }
    };
    
    async deleteFile(req: Request, res: Response) {
        const {imageName} = req.params
    
        const imagePath = resolve('photoUploads', imageName);
    
        if (!existsSync(imagePath)) return res.status(404).json({ message: "Image not found" });
        unlinkSync(imagePath)
    
        res.status(202).json({message: "file deleted with success"})
    };
}