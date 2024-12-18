import { Router } from "express";
import {
  createMovies,
  deleteMovies,
  getAllMovies,
  getMovieById,
  getMovieDetails,
  updateMovies,
  getMoviesByGenre,
  getSeasonsByMovieId,
  getEpisodeDetails,
  upvoteMovie,
} from "../controllers/movies";
import { authenticate, checkRole } from "../middlewares/auth";

const routerMovies = Router();

routerMovies.get("/", getAllMovies);
routerMovies.post("/", createMovies);
routerMovies.get("/:idMovie", getMovieById);
routerMovies.put("/:idMovie/upvote", upvoteMovie);
routerMovies.get("/:idMovie/seasons", getSeasonsByMovieId);
routerMovies.get("/:idMovie/seasons/:idSeason/episodes/:idEpisode", getEpisodeDetails);
routerMovies.put("/:idMovie", updateMovies);
routerMovies.delete("/:idMovie", deleteMovies);


routerMovies.get("/genre/:genreName", getMoviesByGenre);

export default routerMovies;
