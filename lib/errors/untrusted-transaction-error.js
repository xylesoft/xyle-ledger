"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UntrustedTransactionError extends Error {
    constructor(transaction) {
        super(`Untrusted Transaction Error: missing signature and/or seed [failed with data ${JSON.stringify(transaction)}]`);
    }
}
exports.default = UntrustedTransactionError;
