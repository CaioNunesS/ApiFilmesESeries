import { Router } from "express";
import { movieController } from "../controllers/movie.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { validate } from "../middleware/validate";
import { newMovie } from "../schemaValidations/movie.validation";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { isAdministrator } from "../middleware/isAdmin";

const movieRoutes = Router();
movieRoutes.post("/", isAuthenticated, isAdministrator, validate(newMovie), asyncWrapper(new movieController().create))
movieRoutes.get("/", isAuthenticated, asyncWrapper(new movieController().findAll))
movieRoutes.get("/:movieId", isAuthenticated, asyncWrapper(new movieController().find))
movieRoutes.put("/:movieId", isAuthenticated, isAdministrator, validate(newMovie), asyncWrapper(new movieController().update))
movieRoutes.delete("/:movieId", isAuthenticated, isAdministrator, asyncWrapper(new movieController().exclude))

export { movieRoutes }
