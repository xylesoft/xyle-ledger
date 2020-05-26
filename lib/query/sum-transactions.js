"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../contracts/transaction");
exports.default = (transactions, includeRoot = false) => {
    let sum = 0;
    transactions.forEach(transaction => {
        if (!includeRoot && transaction_1.isRootTransaction(transaction)) {
            return; // skip
        }
        sum += transaction.value;
    });
    return sum;
};
