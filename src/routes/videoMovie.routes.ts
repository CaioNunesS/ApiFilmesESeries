import { Router } from "express";
import multer from "multer"
import { isAuthenticated } from "../middleware/isAuthenticated";
import { discStorage, limits, videoFileFilter } from "../middleware/videoUpload";
import { uploadMovieVideo } from "../controllers/videoMovie.controller"

const videoMovieRouter = Router();

videoMovieRouter.post("/:movieId", isAuthenticated,
    multer({ storage: discStorage, limits, fileFilter: videoFileFilter }).single("file"),
    (new uploadMovieVideo().fileUploadMovieVideo));
videoMovieRouter.get("/:videoName", isAuthenticated, (new uploadMovieVideo().viewVideo));
videoMovieRouter.delete("/:videoName", isAuthenticated, (new uploadMovieVideo().deleteFile));

export { videoMovieRouter }