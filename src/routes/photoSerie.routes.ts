import { Router } from "express";
import multer from "multer"
import { isAuthenticated } from "../middleware/isAuthenticated";
import { discStorage, limits, imageFileFilter } from "../middleware/photoUpload";
import { uploadSeriePhoto } from "../controllers/photoSerie.controller"
import { isAdministrator } from "../middleware/isAdmin";

const photoSerieRouter = Router();

photoSerieRouter.post("/:serieId", isAuthenticated, isAdministrator,
    multer({ storage: discStorage, limits, fileFilter: imageFileFilter }).single("file"),
    (new uploadSeriePhoto().fileUploadSeriePhoto));
photoSerieRouter.get("/:imageName", isAuthenticated, (new uploadSeriePhoto().viewImage));
photoSerieRouter.delete("/:imageName", isAuthenticated, isAdministrator, (new uploadSeriePhoto().deleteFile));

export { photoSerieRouter }