import { Router } from "express";
import { getTotalUsers, getTotalViews } from "../controllers/dashboard";

const routerDashBoard = Router();


routerDashBoard.get("/totalViews", getTotalViews); // tạo
routerDashBoard.get("/user", getTotalUsers); // lấy all user
export default routerDashBoard;
