import { Router } from "express";
import { createFavorite, deleteFavorite, getFavoriteCountByMovieId, getFavoritesByUserId } from "../controllers/favorite";
import { authenticate } from "../middlewares/auth/authenticate";
import { checkRole } from "../middlewares/auth/checkRole";


const routerFavorite = Router();

routerFavorite.post("/", createFavorite);
routerFavorite.get("/user/:id", getFavoritesByUserId);
routerFavorite.get("/movie/:id",authenticate, getFavoriteCountByMovieId);

routerFavorite.delete("/:id", deleteFavorite);



export default routerFavorite;
