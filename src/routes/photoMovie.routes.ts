import { Router } from "express";
import multer from "multer"
import { isAuthenticated } from "../middleware/isAuthenticated";
import { discStorage, limits, imageFileFilter } from "../middleware/photoUpload";
import { uploadMoviePhoto } from "../controllers/photoMovie.controller"
import { isAdministrator } from "../middleware/isAdmin";

const photoMovieRouter = Router();

photoMovieRouter.post("/:movieId", isAuthenticated, isAdministrator,
    multer({ storage: discStorage, limits, fileFilter: imageFileFilter }).single("file"),
    (new uploadMoviePhoto().fileUploadMoviePhoto));
photoMovieRouter.get("/:imageName", isAuthenticated, (new uploadMoviePhoto().viewImage));
photoMovieRouter.delete("/:imageName", isAuthenticated, isAdministrator, (new uploadMoviePhoto().deleteFile));

export { photoMovieRouter }