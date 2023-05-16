import { Router } from "express";
import { directorController } from "../controllers/director.controller";
import { validate } from "../middleware/validate";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { newDirector } from "../schemaValidations/director.validation";

const directorRoutes = Router()
directorRoutes.post("/", isAuthenticated, validate(newDirector), asyncWrapper( new directorController().create))
directorRoutes.get("/", asyncWrapper(new directorController().findAll))
directorRoutes.get("/:idDirector", asyncWrapper(new directorController().find))
directorRoutes.put("/:idDirector", isAuthenticated, validate(newDirector), asyncWrapper(new directorController().update))
directorRoutes.delete("/:idDirector", isAuthenticated, asyncWrapper(new directorController().exclude))

export { directorRoutes };