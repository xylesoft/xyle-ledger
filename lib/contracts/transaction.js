"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignedTransaction = exports.isRootTransaction = void 0;
exports.isRootTransaction = (transaction) => {
    var _a;
    return Boolean(transaction !== null &&
        typeof transaction === 'object' &&
        ((_a = transaction) === null || _a === void 0 ? void 0 : _a.root) === true);
};
exports.isSignedTransaction = (transaction) => {
    var _a, _b;
    return Boolean(transaction !== null &&
        typeof transaction === 'object' && ((_a = transaction) === null || _a === void 0 ? void 0 : _a.signature) && ((_b = transaction) === null || _b === void 0 ? void 0 : _b.seed));
};
