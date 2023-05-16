import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { validate } from "../middleware/validate";
import { newUser } from "../schemaValidations/user.validation";

const userRoutes = Router();
userRoutes.post("/", validate(newUser), asyncWrapper(new userController().create))
userRoutes.get("/", isAuthenticated, asyncWrapper(new userController().findAll))
userRoutes.get("/:userId", isAuthenticated, asyncWrapper(new userController().find))
userRoutes.put("/:userId", isAuthenticated, validate(newUser), asyncWrapper(new userController().update))
userRoutes.delete("/:userId", asyncWrapper(new userController().exclude))

export { userRoutes }