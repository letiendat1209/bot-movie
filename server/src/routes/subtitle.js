import { Router } from "express";
import { createSubtitle, deleteSubtitle, getSubtitleByEpisodeId, updateSubtitle } from "../controllers/Subtitle";

const routerSubtitle = Router();

routerSubtitle.post("/", createSubtitle);
routerSubtitle.get("/:id", getSubtitleByEpisodeId);
routerSubtitle.put("/:id", updateSubtitle);
routerSubtitle.delete("/:id", deleteSubtitle);

export default routerSubtitle;
