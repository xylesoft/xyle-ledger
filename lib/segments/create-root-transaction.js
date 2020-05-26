"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_1 = __importDefault(require("../encryption/sign"));
const moment_1 = __importDefault(require("moment"));
exports.default = (previousSegmentTotalValue, seed, previousSegmentKey, privateKey, passphrase) => {
    const rawRootTransaction = {
        value: previousSegmentTotalValue,
        timestamp: Number(moment_1.default.utc().format('x')),
        root: true,
        reference: `SegmentRootTransaction: descendant of segment "${previousSegmentKey}".`,
    };
    try {
        const seededRootTransaction = Object.assign(Object.assign({}, rawRootTransaction), { seed });
        return Object.assign(Object.assign({}, seededRootTransaction), { signature: sign_1.default(seededRootTransaction, privateKey, passphrase) });
    }
    catch (error) {
        throw error;
    }
};
