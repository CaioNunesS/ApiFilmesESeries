import { Router } from "express";
import multer from "multer"
import { isAuthenticated } from "../middleware/isAuthenticated";
import { discStorage, limits, videoFileFilter } from "../middleware/videoUpload";
import { uploadEpisodeVideo } from "../controllers/videoEpisode.controller"

const videoEpisodeRouter = Router();

videoEpisodeRouter.post("/:episodeId", isAuthenticated,
    multer({ storage: discStorage, limits, fileFilter: videoFileFilter }).single("file"),
    (new uploadEpisodeVideo().fileUploadEpisodeVideo));
videoEpisodeRouter.get("/:videoName", isAuthenticated, (new uploadEpisodeVideo().viewVideo));
videoEpisodeRouter.delete("/:videoName", isAuthenticated, (new uploadEpisodeVideo().deleteFile));

export { videoEpisodeRouter }