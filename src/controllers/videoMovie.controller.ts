import { existsSync, unlinkSync } from "fs";
import { resolve } from "path";
import { Request, Response } from "express";
import { movieRepository } from "../repositories/movie.repository";

export class uploadMovieVideo{

    async viewVideo(req: Request, res: Response){
        const { videoName } = req.params;
        const videoPath = resolve('videoUploads', videoName);
    
        if (!existsSync(videoPath)) return res.status(404).json({ message: "Video not found" });
    
        return res.sendFile(videoPath);
    };
    
    async fileUploadMovieVideo(req: Request, res: Response) {
        const { movieId } = req.params;
        
        if (!req.file) return res.status(422).json({ message: "Please select a file" });
        
        const getMovieId: any = await movieRepository.findOneBy({id: movieId});
        
        if(!getMovieId) return res.status(404).json({message: "Episode not found"})

        const {title, photo, movieFile} = getMovieId
        const movieVideo = `${process.env.URL_IMAGE}/${req.file.filename}`
        
        const movie = {title, photo, movieFile}
    try {
        await movieRepository.update({id: movieId}, {movieFile: movieVideo})
    
        return res.json({ data: movie });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: "Internal server error" })
    }
    };
    
    async deleteFile(req: Request, res: Response) {
        const {videoName} = req.params
    
        const videoPath = resolve('videoUploads', videoName);
    
        if (!existsSync(videoPath)) return res.status(404).json({ message: "Image not found" });
        unlinkSync(videoPath)
    
        res.status(202).json({message: "file deleted with success"})
    };
}