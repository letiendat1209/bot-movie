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
} from "../controllers/movies";
import { authenticate, checkRole } from "../middlewares/auth";

const routerMovies = Router();

routerMovies.post("/", getAllMovies);
routerMovies.post("/", createMovies);
routerMovies.get("/:idMovie", getMovieById);
routerMovies.get("/:idMovie/seasons", getSeasonsByMovieId);
routerMovies.get("/:idMovie/seasons/:idSeason/episodes/:idEpisode", getEpisodeDetails);
routerMovies.put("/:idMovie", authenticate , checkRole("admin"), updateMovies);
routerMovies.delete("/:idMovie", deleteMovies);


routerMovies.get("/genre/:genreName", getMoviesByGenre);

export default routerMovies;
