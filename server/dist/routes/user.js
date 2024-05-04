"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const UserRouter = (0, express_1.Router)();
UserRouter.post("/login", user_1.handleLoginRoute);
UserRouter.post("/register", user_1.handleSignupRoute);
exports.default = UserRouter;
