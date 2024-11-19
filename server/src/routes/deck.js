import { Router } from "express";
import {
  createDeck,
  deleteDeck,
  getDeckById,
  getDecksByUserId,
  updateDeck,
} from "../controllers/deck";

const routerDeck = Router();

routerDeck.post("/", createDeck);
routerDeck.get("/user/:id", getDecksByUserId);
routerDeck.get("/:id", getDeckById);
routerDeck.put("/:id", updateDeck);
routerDeck.delete("/:id", deleteDeck);

export default routerDeck;
