import { Router } from "express";
import { createTags, deleteTags, getAllTags, getTagById, updateTags } from "../controllers/tag";


const routerTag = Router();

routerTag.post("/", createTags);
routerTag.get("/", getAllTags);
routerTag.get("/:id", getTagById);
routerTag.put("/", updateTags);
routerTag.delete("/:id", deleteTags);


export default routerTag;
