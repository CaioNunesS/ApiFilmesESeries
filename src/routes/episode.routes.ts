import { Router } from "express";
import { episodeController } from "../controllers/episode.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { validate } from "../middleware/validate";
import { newEpisode } from "../schemaValidations/episode.validation";

const episodeRoutes = Router();
episodeRoutes.post("/", isAuthenticated, validate(newEpisode), asyncWrapper(new episodeController().create))
episodeRoutes.get("/", asyncWrapper(new episodeController().findAll))
episodeRoutes.get("/:epsodeId", asyncWrapper(new episodeController().find))
episodeRoutes.put("/:epsodeId", isAuthenticated, validate(newEpisode), asyncWrapper(new episodeController().update))
episodeRoutes.delete("/:epsodeId", isAuthenticated, asyncWrapper(new episodeController().exclude))

export { episodeRoutes }
