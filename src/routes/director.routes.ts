import { Router } from "express";
import { directorController } from "../controllers/director.controller";
import { validate } from "../middleware/validate";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { newDirector } from "../schemaValidations/director.validation";
import { isAdministrator } from "../middleware/isAdmin";

const directorRoutes = Router()
directorRoutes.post("/", isAuthenticated, isAdministrator, validate(newDirector), asyncWrapper( new directorController().create))
directorRoutes.get("/", isAuthenticated, asyncWrapper(new directorController().findAll))
directorRoutes.get("/:idDirector", isAuthenticated, asyncWrapper(new directorController().find))
directorRoutes.put("/:idDirector", isAuthenticated, isAdministrator, validate(newDirector), asyncWrapper(new directorController().update))
directorRoutes.delete("/:idDirector", isAuthenticated, isAdministrator, asyncWrapper(new directorController().exclude))

export { directorRoutes };