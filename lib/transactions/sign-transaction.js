"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../contracts/transaction");
const untrusted_transaction_error_1 = __importDefault(require("../errors/untrusted-transaction-error"));
const sign_1 = __importDefault(require("../encryption/sign"));
exports.default = (transaction, parentTransaction, privateKey, passphrase) => {
    if (!transaction_1.isSignedTransaction(parentTransaction)) {
        throw new untrusted_transaction_error_1.default(parentTransaction);
    }
    const seededTransaction = Object.assign(Object.assign({}, transaction), { seed: parentTransaction.signature });
    return Object.assign(Object.assign({}, seededTransaction), { signature: sign_1.default(seededTransaction, privateKey, passphrase) });
};
