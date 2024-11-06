import { Router } from "express";
import {
    createEpisode,
    deleteEpisode,
    getAllEpisodes,
    getAllEpisodesBySeasonId,
    getEpisodeById,
    updateEpisode,
} from "../controllers/episode";

const routerEpisode = Router();

routerEpisode.post("/", createEpisode); // tạo
routerEpisode.get("/", getAllEpisodes); // lấy all
routerEpisode.get("/:id", getEpisodeById);
routerEpisode.get("/:id/seasons", getAllEpisodesBySeasonId); // lấy theo season id
routerEpisode.put("/:id", updateEpisode); // cập nhật
routerEpisode.delete("/:id", deleteEpisode); // xóa

export default routerEpisode;
