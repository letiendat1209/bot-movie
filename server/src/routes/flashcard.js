import { Router } from "express";
import { createFlashcard, deleteFlashcard, getFlashcardById, getFlashcardsByDeckId, updateFlashcard } from "../controllers/flashcard";

const routerFlashcard = Router();

routerFlashcard.post("/", createFlashcard);
routerFlashcard.get("/:id", getFlashcardById);
routerFlashcard.get("/deck/:id", getFlashcardsByDeckId);
routerFlashcard.put("/:id", updateFlashcard);
routerFlashcard.delete("/:id", deleteFlashcard);

export default routerFlashcard;
