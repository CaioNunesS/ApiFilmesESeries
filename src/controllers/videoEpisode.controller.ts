import { existsSync, unlinkSync } from "fs";
import { resolve } from "path";
import { Request, Response } from "express";
import { episodeRepository } from "../repositories/episode.repository";

export class uploadEpisodeVideo{

    async viewVideo(req: Request, res: Response){
        const { videoName } = req.params;
        const videoPath = resolve('videoUploads', videoName);
    
        if (!existsSync(videoPath)) return res.status(404).json({ message: "Video not found" });
    
        return res.sendFile(videoPath);
    };
    
    async fileUploadEpisodeVideo(req: Request, res: Response) {
        const { episodeId } = req.params;
        
        if (!req.file) return res.status(422).json({ message: "Please select a file" });
        
        const getEpisodeId: any = await episodeRepository.findOneBy({id: episodeId});
        
        if(!getEpisodeId) return res.status(404).json({message: "Episode not found"})

        const {title, photo} = getEpisodeId
        const episodeVideo = `${process.env.URL_IMAGE}/${req.file.filename}`
        
        const episode = {title, photo, episodeVideo}
    try {
        await episodeRepository.update({id: episodeId}, {episodeFile: episodeVideo})
    
        return res.json({ data: episode });
        
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({ message: "Internal server error" })
    }
    };
    
    async deleteFile(req: Request, res: Response) {
        const {videoName} = req.params
    
        const videoPath = resolve('videoUploads', videoName);
    
        if (!existsSync(videoPath)) return res.status(404).json({ message: "Episode not found" });
        unlinkSync(videoPath)
    
        res.status(202).json({message: "file deleted with success"})
    };
}