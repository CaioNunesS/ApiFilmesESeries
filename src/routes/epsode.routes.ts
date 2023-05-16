import { Router } from "express";
import { epsodeController } from "../controllers/epsode.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { validate } from "../middleware/validate";
import { newEpisode } from "../schemaValidations/episode.validation";

const epsodeRoutes = Router();
epsodeRoutes.post("/", isAuthenticated, validate(newEpisode), asyncWrapper(new epsodeController().create))
epsodeRoutes.get("/", asyncWrapper(new epsodeController().findAll))
epsodeRoutes.get("/:epsodeId", asyncWrapper(new epsodeController().find))
epsodeRoutes.put("/:epsodeId", isAuthenticated, validate(newEpisode), asyncWrapper(new epsodeController().update))
epsodeRoutes.delete("/:epsodeId", isAuthenticated, asyncWrapper(new epsodeController().exclude))

export { epsodeRoutes }
