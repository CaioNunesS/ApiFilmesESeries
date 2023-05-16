import { AppDataSource } from "../dataSource.ts";
import { Epsode } from "../entities/Epsode.model";
export const epsodeRepository = AppDataSource.getRepository(Epsode)