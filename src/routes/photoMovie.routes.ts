import { Router } from "express";
import multer from "multer"
import { isAuthenticated } from "../middleware/isAuthenticated";
import { discStorage, limits, imageFileFilter } from "../middleware/photoUpload";
import { uploadMoviePhoto } from "../controllers/photoMovie.controller"

const photoMovieRouter = Router();

photoMovieRouter.post("/:movieId", isAuthenticated,
    multer({ storage: discStorage, limits, fileFilter: imageFileFilter }).single("file"),
    (new uploadMoviePhoto().fileUploadMoviePhoto));
photoMovieRouter.get("/:imageName", isAuthenticated, (new uploadMoviePhoto().viewImage));
photoMovieRouter.delete("/:imageName", isAuthenticated, (new uploadMoviePhoto().deleteFile));

export { photoMovieRouter }