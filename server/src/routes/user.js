import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user";

const routerUser = Router();

routerUser.get("/", getAllUsers);
routerUser.get("/:id", getUserById);
routerUser.put("/:id", updateUser);
routerUser.delete("/:id", deleteUser);

export default routerUser;
