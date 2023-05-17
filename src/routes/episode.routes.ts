import { Router } from "express";
import { episodeController } from "../controllers/episode.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { validate } from "../middleware/validate";
import { newEpisode } from "../schemaValidations/episode.validation";
import { isAdministrator } from "../middleware/isAdmin";

const episodeRoutes = Router();
episodeRoutes.post("/", isAuthenticated, isAdministrator, validate(newEpisode), asyncWrapper(new episodeController().create))
episodeRoutes.get("/", isAuthenticated, asyncWrapper(new episodeController().findAll))
episodeRoutes.get("/:epsodeId", isAuthenticated, asyncWrapper(new episodeController().find))
episodeRoutes.put("/:epsodeId", isAuthenticated, isAdministrator, validate(newEpisode), asyncWrapper(new episodeController().update))
episodeRoutes.delete("/:epsodeId", isAuthenticated, isAdministrator, asyncWrapper(new episodeController().exclude))

export { episodeRoutes }
