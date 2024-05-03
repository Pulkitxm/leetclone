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
const redis_1 = require("redis");
const util_1 = require("./util");
const types_1 = require("./types");
const client = (0, redis_1.createClient)();
function processSubmission(submission) {
    return __awaiter(this, void 0, void 0, function* () {
        const obj = types_1.CodeTypeZod.parse(JSON.parse(submission));
        const output = yield (0, util_1.executeCode)(obj);
        const customOutput = { output: "", error: "" };
        customOutput.output = output.run.stdout;
        customOutput.error = output.run.code === 0 ? "" : output.run.stderr;
        return output;
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            while (true) {
                try {
                    const submission = yield client.brPop("problems", 0);
                    if (!submission)
                        continue;
                    yield processSubmission(submission.element);
                }
                catch (error) {
                    console.error("Error processing submission:", error);
                }
            }
        }
        catch (error) {
            console.error("Failed to connect to Redis", error);
        }
    });
}
startWorker();
