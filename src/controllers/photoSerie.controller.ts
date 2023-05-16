import { existsSync, unlinkSync } from "fs";
import { resolve } from "path";
import { Request, Response } from "express";
import { serieRepository } from "../repositories/serie.repository";

export class uploadSeriePhoto{

    async viewImage(req: Request, res: Response){
        const { imageName } = req.params;
        const imagePath = resolve('photoUploads', imageName);
    
        if (!existsSync(imagePath)) return res.status(404).json({ message: "Image not found" });
    
        return res.sendFile(imagePath);
    };
    
    async fileUploadSeriePhoto(req: Request, res: Response) {
        const { serieId } = req.params;
        
        if (!req.file) return res.status(422).json({ message: "Please select a file" });
        
        const getSerieId: any = await serieRepository.findOneBy({id: serieId});
        
        if(!getSerieId) return res.status(404).json({message: "Serie not found"})
        
        const {title, photo} = getSerieId
        const seriePhoto = `${process.env.URL_IMAGE}/${req.file.filename}`
        
        const serie = {title, photo}
    try {
        await serieRepository.update({id: serieId}, {photo: seriePhoto})
    
        return res.json({ data: serie });
        
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