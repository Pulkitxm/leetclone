"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupType = exports.LoginType = void 0;
const zod_1 = require("zod");
exports.LoginType = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.SignupType = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    rePassword: zod_1.z.string().min(8),
});
