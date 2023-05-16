import { Router } from "express";
import { directorRoutes } from "./routes/director.routes";
import { movieRoutes } from "./routes/movie.routes";
import { serieRoutes } from "./routes/serie.routes";
import { userRoutes } from "./routes/user.routes";
import { epsodeRoutes } from "./routes/epsode.routes";
import { authRoutes } from "./routes/auth.routes";
import { photoMovieRouter } from "./routes/photoMovie.routes";
import { photoSerieRouter } from "./routes/photoSerie.routes";
import { videoMovieRouter } from "./routes/videoMovie.routes";
import { videoEpisodeRouter } from "./routes/videoEpisode.routes";

const routes = Router();

routes.use("/director", directorRoutes);
routes.use("/movie", movieRoutes);
routes.use("/serie", serieRoutes);
routes.use("/user", userRoutes);
routes.use("/episode", epsodeRoutes);
routes.use("/auth", authRoutes);
routes.use("/moviePhoto", photoMovieRouter);
routes.use("/seriePhoto", photoSerieRouter);
routes.use("/movieVideo", videoMovieRouter)
routes.use("/episodeVideo", videoEpisodeRouter)

export { routes };