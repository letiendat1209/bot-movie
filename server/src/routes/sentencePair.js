import { Router } from "express";
import { createSentencePair, deleteSentencePair, getSentencePairsByUserId, updateSentencePair } from "../controllers/sentencepair";

const routerSentencePair = Router();

routerSentencePair.post("/", createSentencePair);
routerSentencePair.get("/:id", getSentencePairsByUserId);
routerSentencePair.put("/:id", updateSentencePair);
routerSentencePair.delete("/:id", deleteSentencePair);

export default routerSentencePair;
