"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCode = void 0;
const config_1 = require("./config");
const executeCode = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const lang = obj.language;
    const langVersions = config_1.supportedLangsVersions;
    if (!langVersions[`${lang}`])
        throw new Error("Language not supported");
    const version = langVersions[`${lang}`];
    const resp = yield fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            language: obj.language,
            version,
            files: [
                {
                    content: obj.code,
                },
            ],
        }),
    });
    return resp;
});
exports.executeCode = executeCode;
