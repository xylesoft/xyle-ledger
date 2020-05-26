"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_1 = __importDefault(require("../encryption/sign"));
const fs_1 = require("fs");
exports.default = (segmentPath, privateKey, passphrase) => {
    if (!fs_1.existsSync(segmentPath)) {
        throw new Error(`XyleLedger signSegment() cannot find segment file: ${segmentPath}`);
    }
    return sign_1.default(fs_1.readFileSync(segmentPath, 'utf-8'), privateKey, passphrase);
};
