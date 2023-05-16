import { AppDataSource } from "../dataSource.ts";
import { User } from "../entities/User.model";
export const userRepository = AppDataSource.getRepository(User)