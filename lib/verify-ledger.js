"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_transaction_signature_error_1 = __importDefault(require("./errors/invalid-transaction-signature-error"));
const verify_transaction_1 = __importDefault(require("./verify-transaction"));
exports.default = (transactions, publicKey) => {
    // console.log(transactions
    //     .sort((parent: SignedTransaction, child: SignedTransaction) => {
    //         if (parent.timestamp === child.timestamp) return 0;
    //         return parent.timestamp < child.timestamp ? -1 : 1;
    //     }).reverse());
    transactions
        .sort((parent, child) => {
        if (parent.timestamp === child.timestamp)
            return 0;
        return parent.timestamp < child.timestamp ? -1 : 1;
    })
        .forEach((transaction) => {
        if (!verify_transaction_1.default(transaction, publicKey)) {
            throw new invalid_transaction_signature_error_1.default(transaction);
        }
    });
    return true;
};
