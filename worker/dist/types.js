"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTypeZod = void 0;
const zod_1 = require("zod");
exports.CodeTypeZod = zod_1.z.object({
    code: zod_1.z.string(),
    language: zod_1.z.string(),
});
