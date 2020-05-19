"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_transaction_1 = __importDefault(require("./sign-transaction"));
const ledger_timestamp_1 = __importDefault(require("../ledger-timestamp"));
exports.default = (value, previousTransaction, privateKey, passphrase, reference) => sign_transaction_1.default({
    value,
    reference,
    timestamp: ledger_timestamp_1.default(),
}, previousTransaction, privateKey, passphrase);
