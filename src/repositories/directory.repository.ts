import { AppDataSource } from "../dataSource.ts";
import { Director } from "../entities/Director.model";

export const directorRepository = AppDataSource.getRepository(Director)