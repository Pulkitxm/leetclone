"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unHashPass = exports.hashPass = void 0;
const hashPass = (pass) => {
    let hashedPass = "";
    for (let i = 0; i < pass.length; i++) {
        hashedPass = hashedPass + `z${pass[i]}z`;
    }
    return "xx" + hashedPass + "yy";
};
exports.hashPass = hashPass;
const unHashPass = (hashedPass) => {
    let midHashedPass = hashedPass.substr(2, hashedPass.length - 4);
    let pass = "";
    for (let i = 0; i < midHashedPass.length; i++) {
        if (midHashedPass[i] !== "z") {
            pass += midHashedPass[i];
        }
    }
    return pass;
};
exports.unHashPass = unHashPass;
