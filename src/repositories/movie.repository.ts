import { AppDataSource } from "../dataSource.ts";
import { Movie } from "../entities/Movie.model";
export const movieRepository = AppDataSource.getRepository(Movie)