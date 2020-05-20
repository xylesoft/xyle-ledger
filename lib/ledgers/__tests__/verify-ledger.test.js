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
const helper_1 = require("../../__tests__/helper");
const verify_ledger_1 = __importDefault(require("../verify-ledger"));
const encryption_1 = require("../../encryption");
describe('Testing whether verifyLedger() is working', () => {
    it('should succesfully validate an known validate ledger', () => {
        const { transactions: ledger, publicKey } = helper_1.mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        expect(verify_ledger_1.default(ledger, publicKey)).toBeTruthy();
    });
    it('should throw a transaction signature error', () => {
        const { transactions: ledger, publicKey } = helper_1.mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        ledger[0].seed = 'moomoo';
        const regex = /Signature error: [a-zA-Z0-9]+ \[signature failed with data .+/;
        expect(() => verify_ledger_1.default(ledger, publicKey)).toThrowError(regex);
    });
    it('should throw a transaction seed error, one of the transaction has been tampered with', () => {
        const { transactions: ledger, publicKey, privateKey } = helper_1.mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        // tslint:disable
        const _a = ledger[3], { signature } = _a, transaction = __rest(_a, ["signature"]);
        // tslint:enable
        const fiddledTransaction = Object.assign(Object.assign({}, transaction), { value: 999.99 });
        ledger[3] = Object.assign(Object.assign({}, fiddledTransaction), { signature: encryption_1.xyleLedgerSign(fiddledTransaction, privateKey, 'homer') });
        const regex2 = /Seed error: [a-zA-Z0-9]+[\w\s\S.]+] after 5 transaction.+/;
        expect(() => verify_ledger_1.default(ledger, publicKey)).toThrowError(regex2);
    });
});
