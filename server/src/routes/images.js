import { Router } from "express";
import { createImage, deleteImage, getImageById, getImagesByType, updateImage } from "../controllers/Images";
const routerImages = Router();

routerImages.post("/", createImage);
routerImages.get("/:id", getImageById);
routerImages.get("/type/:type", getImagesByType);
routerImages.put("/:id", updateImage);
routerImages.delete("/id", deleteImage);


export default routerImages;
