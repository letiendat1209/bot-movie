import { Router } from "express";
import { createSeason, getAllSeasons, getSeasonById, getSeasonByMovieId, updateSeason } from "../controllers/season";

const routerSeason = Router();

routerSeason.post("/", createSeason)
routerSeason.get("/", getAllSeasons)
routerSeason.get("/:id", getSeasonById)
routerSeason.get("/:id/movies", getSeasonByMovieId)
routerSeason.put("/:id", updateSeason)

export default routerSeason;
