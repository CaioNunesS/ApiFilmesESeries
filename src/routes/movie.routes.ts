import { Router } from "express";
import { movieController } from "../controllers/movie.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { validate } from "../middleware/validate";
import { newMovie } from "../schemaValidations/movie.validation";
import { asyncWrapper } from "../middleware/asyncWrapper";

const movieRoutes = Router();
movieRoutes.post("/", isAuthenticated, validate(newMovie), asyncWrapper(new movieController().create))
movieRoutes.get("/", asyncWrapper(new movieController().findAll))
movieRoutes.get("/:movieId", asyncWrapper(new movieController().find))
movieRoutes.put("/:movieId", isAuthenticated, validate(newMovie), asyncWrapper(new movieController().update))
movieRoutes.delete("/:movieId", isAuthenticated, asyncWrapper(new movieController().exclude))

export { movieRoutes }
