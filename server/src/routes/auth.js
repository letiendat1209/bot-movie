import { Router } from "express";
import { forgotPassword, resetPassword, signIn, signUp } from "../controllers/auth";

const routerAuth = Router();

routerAuth.post("/signUp", signUp);
routerAuth.post("/signIn", signIn);
routerAuth.post("/forgotPassword", forgotPassword);
routerAuth.post("/resetPassword", resetPassword);

export default routerAuth;
