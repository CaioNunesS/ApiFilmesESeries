import { AppDataSource } from "../dataSource.ts";
import { Episode } from "../entities/Episode.model.ts";
export const episodeRepository = AppDataSource.getRepository(Episode)