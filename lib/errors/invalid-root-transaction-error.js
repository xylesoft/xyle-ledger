"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidRootTransactionError extends Error {
    constructor(transaction, iterationCount) {
        const iteration = typeof iterationCount === 'number' ? ` after ${iterationCount} transaction(s) in ledger` : '';
        super(`Root Transaction error, decrpytion of root seed was invalid.\Decrpytion failed on [\n${JSON.stringify(transaction, null, 2)}]${iteration}`);
    }
}
exports.default = InvalidRootTransactionError;
