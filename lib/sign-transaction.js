"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("./contracts/transaction");
const untrusted_transaction_error_1 = __importDefault(require("./errors/untrusted-transaction-error"));
const sign_1 = __importDefault(require("./encryption/sign"));
exports.default = (transaction, seedTransaction, privateKey, passphrase) => {
    if (!transaction_1.isSignedTransaction(seedTransaction)) {
        throw new untrusted_transaction_error_1.default(seedTransaction);
    }
    const seededTransaction = Object.assign(Object.assign({}, transaction), { seed: seedTransaction.signature });
    return Object.assign(Object.assign({}, seededTransaction), { signature: sign_1.default(seededTransaction, privateKey, passphrase) });
};
