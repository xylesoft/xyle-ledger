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
const verify_transaction_1 = __importDefault(require("./verify-transaction"));
const decrypt_1 = __importDefault(require("../encryption/decrypt"));
exports.default = (transaction, publicKey, privateKey, passphrase) => {
    if (verify_transaction_1.default(transaction, publicKey)) {
        const { seed } = transaction, rawTransaction = __rest(transaction, ["seed"]);
        try {
            const decryptedTransaction = JSON.parse(decrypt_1.default(seed, privateKey, passphrase));
            return rawTransaction.value === decryptedTransaction.value &&
                rawTransaction.timestamp === decryptedTransaction.timestamp &&
                rawTransaction.reference === decryptedTransaction.reference;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    return false;
};
