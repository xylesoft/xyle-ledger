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
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidTransactionSignatureError extends Error {
    constructor(transaction, iterationCount) {
        const { signature } = transaction, rawTransaction = __rest(transaction, ["signature"]);
        const iteration = typeof iterationCount === 'number' ? ` after ${iterationCount} transaction(s) in ledger` : '';
        super(`Signature error: ${signature} [signature failed with data ${JSON.stringify(rawTransaction, null, 2)}]${iteration}`);
    }
}
exports.default = InvalidTransactionSignatureError;
