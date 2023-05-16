import { AppDataSource } from "../dataSource.ts";
import { Serie } from "../entities/Serie.model";
export const serieRepository = AppDataSource.getRepository(Serie)