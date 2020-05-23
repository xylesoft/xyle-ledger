"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../contracts/transaction");
const invalid_transaction_signature_error_1 = __importDefault(require("../errors/invalid-transaction-signature-error"));
const verify_transaction_1 = __importDefault(require("../transactions/verify-transaction"));
const verify_1 = __importDefault(require("../encryption/verify"));
const invalid_transaction_seed_error_1 = __importDefault(require("../errors/invalid-transaction-seed-error"));
const verify_root_transaction_1 = __importDefault(require("../transactions/verify-root-transaction"));
const invalid_root_transaction_error_1 = __importDefault(require("../errors/invalid-root-transaction-error"));
const sortTransactionsDescendingOrder = (parent, child) => {
    if (parent.timestamp === child.timestamp)
        return 0;
    return parent.timestamp > child.timestamp ? -1 : 1; // start from newest transaction first
};
exports.default = (transactions, publicKey, privateKey, passphrase) => {
    let parentTransaction = null;
    let iterationCount = 0;
    let verifiedRoot = false;
    for (const transaction of transactions.sort(sortTransactionsDescendingOrder)) {
        if (!verify_transaction_1.default(transaction, publicKey)) {
            throw new invalid_transaction_signature_error_1.default(transaction, iterationCount);
        }
        if (transaction_1.isRootTransaction(transaction)) {
            if (!verify_root_transaction_1.default(transaction, publicKey, privateKey, passphrase)) {
                throw new invalid_root_transaction_error_1.default(transaction, iterationCount);
            }
            verifiedRoot = true;
        }
        if (transaction_1.isSignedTransaction(parentTransaction)) {
            // eslint-disable-next-line
            const { signature } = transaction, unsignedTransaction = __rest(transaction, ["signature"]);
            if (!verify_1.default(unsignedTransaction, parentTransaction.seed, publicKey)) {
                throw new invalid_transaction_seed_error_1.default(parentTransaction.seed, transaction, iterationCount);
            }
        }
        iterationCount++;
        parentTransaction = transaction;
    }
    return true && verifiedRoot;
};
