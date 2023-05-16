import { Router } from "express";
import { authController } from "../controllers/auth.controller"
import { validate } from "../middleware/validate";
import { newAuth } from "../schemaValidations/auth.validation";
import { asyncWrapper } from "../middleware/asyncWrapper";
import { isAuthenticated } from "../middleware/isAuthenticated";

const authRoutes = Router()

authRoutes.post("/login", validate(newAuth), asyncWrapper(new authController().login))
authRoutes.get("/profile", isAuthenticated, asyncWrapper(new authController().profile))

export { authRoutes }