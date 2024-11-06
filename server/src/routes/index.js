import { Router } from "express";
import routerMovies from "./movies";
import routerSeason from "./season";
import routerEpisode from "./episode";
import routerAuth from "./auth";
import routerUser from "./user";
import routerGenre from "./genre";
import routerTag from "./tag";

const initRoutes = Router();

initRoutes.use("/movies", routerMovies);
initRoutes.use("/season", routerSeason);
initRoutes.use("/episode", routerEpisode);
initRoutes.use("/auth", routerAuth);
initRoutes.use("/user", routerUser);
initRoutes.use("/genre", routerGenre);
initRoutes.use("/tag", routerTag);

export default initRoutes;
