import { Router } from "express";
import routerMovies from "./movies";
import routerSeason from "./season";
import routerEpisode from "./episode";
import routerAuth from "./auth";
import routerUser from "./user";
import routerGenre from "./genre";
import routerTag from "./tag";
import routerDashBoard from "./dashboard";
import routerUpload from "./upload";
import routerSubtitle from "./subtitle";
import routerImages from "./images";
import routerSentencePair from "./SentencePair";
import routerDeck from "./deck";
import routerFlashcard from "./flashcard";
import routerFavorite from "./favorite";

const initRoutes = Router();

initRoutes.use("/movies", routerMovies);
initRoutes.use("/season", routerSeason);
initRoutes.use("/episode", routerEpisode);
initRoutes.use("/auth", routerAuth);
initRoutes.use("/user", routerUser);
initRoutes.use("/genre", routerGenre);
initRoutes.use("/tag", routerTag);
initRoutes.use("/dashboard", routerDashBoard);
initRoutes.use("/upload", routerUpload);
initRoutes.use("/subtitle", routerSubtitle);
initRoutes.use("/images", routerImages);
initRoutes.use("/sentencePair", routerSentencePair);
initRoutes.use("/deck", routerDeck);
initRoutes.use("/flashcard", routerFlashcard);
initRoutes.use("/favorite", routerFavorite);

export default initRoutes;
