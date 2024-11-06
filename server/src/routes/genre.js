import { Router } from "express";
import { createGenres, getAllGenres, getGenreById, updateGenres, deleteGenres } from "../controllers/genre";


const routerGenre = Router();

routerGenre.post("/", createGenres);
routerGenre.get("/", getAllGenres);
routerGenre.get("/:id", getGenreById);
routerGenre.put("/", updateGenres);
routerGenre.delete("/:id", deleteGenres);


export default routerGenre;
