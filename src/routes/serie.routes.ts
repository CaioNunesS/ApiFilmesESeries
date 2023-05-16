import { Router } from "express";
import { serieController } from "../controllers/series.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { validate } from "../middleware/validate";
import { newSerie } from "../schemaValidations/serie.validation";
import { asyncWrapper } from "../middleware/asyncWrapper";

const serieRoutes = Router();
serieRoutes.post("/", isAuthenticated, validate(newSerie), asyncWrapper(new serieController().create))
serieRoutes.get("/", asyncWrapper(new serieController().findAll))
serieRoutes.get("/:serieId", asyncWrapper(new serieController().find))
serieRoutes.put("/:serieId", isAuthenticated, validate(newSerie), asyncWrapper(new serieController().update))
serieRoutes.delete("/:serieId", isAuthenticated, asyncWrapper(new serieController().exclude))

export { serieRoutes }
