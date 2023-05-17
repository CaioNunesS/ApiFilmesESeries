import { Router } from "express";
import { serieController } from "../controllers/series.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { validate } from "../middleware/validate";
import { newSerie } from "../schemaValidations/serie.validation";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { isAdministrator } from "../middleware/isAdmin";

const serieRoutes = Router();
serieRoutes.post("/", isAuthenticated, isAdministrator, validate(newSerie), asyncWrapper(new serieController().create))
serieRoutes.get("/", isAuthenticated, asyncWrapper(new serieController().findAll))
serieRoutes.get("/:serieId", isAuthenticated, asyncWrapper(new serieController().find))
serieRoutes.put("/:serieId", isAuthenticated, isAdministrator, validate(newSerie), asyncWrapper(new serieController().update))
serieRoutes.delete("/:serieId", isAuthenticated, isAdministrator, asyncWrapper(new serieController().exclude))

export { serieRoutes }
