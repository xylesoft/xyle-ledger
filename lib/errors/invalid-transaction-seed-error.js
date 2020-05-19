"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidTransactionSeedError extends Error {
    constructor(seed, transaction, iterationCount) {
        const iteration = typeof iterationCount === 'number' ? ` after ${iterationCount} transaction(s) in ledger` : '';
        super(`Seed error: parent transaction seed is "${seed}".\nVerification failed for transaction [\n${JSON.stringify(transaction, null, 2)}]${iteration}`);
    }
}
exports.default = InvalidTransactionSeedError;
