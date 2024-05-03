import { Router } from "express";
import { handleLoginRoute, handleSignupRoute } from "../controllers/user";

const UserRouter = Router();

UserRouter.post("/login", handleLoginRoute);
UserRouter.post("/register", handleSignupRoute);

export default UserRouter;