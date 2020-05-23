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
const sign_1 = __importDefault(require("../../encryption/sign"));
describe('Testing whether verifyLedger() is working', () => {
    it('should succesfully validate an known validate ledger', () => {
        const { transactions: ledger, publicKey, privateKey } = helper_1.mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        expect(verify_ledger_1.default(ledger, publicKey, privateKey, 'homer')).toBeTruthy();
    });
    it('should be able to validate a ledger containing only the root transaction', () => {
        const { transactions: ledger, publicKey, privateKey } = helper_1.mockLedger([], 'homer');
        expect(verify_ledger_1.default(ledger, publicKey, privateKey, 'homer')).toBeTruthy();
    });
    it('should return FALSE if no root transaction exists', () => {
        const { transactions: ledger, publicKey, privateKey } = helper_1.mockLedger([1, 23, 5], 'homer');
        ledger.shift(); // remove root transaction
        expect(verify_ledger_1.default(ledger, publicKey, privateKey, 'homer')).toBeFalsy();
    });
    it('should throw an error if no root transaction exists', () => {
        const { transactions: ledger, publicKey, privateKey } = helper_1.mockLedger([100], 'homer');
        ledger[0].seed = ledger[0].seed + '1234567890';
        // eslint-disable-next-line
        const _a = ledger[0], { signature: dump } = _a, rawRootTransaction = __rest(_a, ["signature"]);
        ledger[0].signature = sign_1.default(rawRootTransaction, privateKey, 'homer');
        ledger[1].seed = ledger[0].signature;
        // eslint-disable-next-line
        const _b = ledger[1], { signature: dump1 } = _b, rawTransaction = __rest(_b, ["signature"]);
        ledger[1].signature = sign_1.default(rawTransaction, privateKey, 'homer');
        const regex = /Root Transaction error, decrpytion of root seed was invalid.+/;
        expect(() => verify_ledger_1.default(ledger, publicKey, privateKey, 'homer')).toThrowError(regex);
    });
    it('should throw a transaction signature error', () => {
        const { transactions: ledger, publicKey, privateKey } = helper_1.mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        ledger[0].seed = 'moomoo';
        const regex = /Signature error: [a-zA-Z0-9]+ \[signature failed with data .+/;
        expect(() => verify_ledger_1.default(ledger, publicKey, privateKey, 'homer')).toThrowError(regex);
    });
    it('should throw a transaction seed error, one of the transaction has been tampered with', () => {
        const { transactions: ledger, publicKey, privateKey } = helper_1.mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        // tslint:disable
        const _a = ledger[3], { signature } = _a, transaction = __rest(_a, ["signature"]);
        // tslint:enable
        const fiddledTransaction = Object.assign(Object.assign({}, transaction), { value: 999.99 });
        ledger[3] = Object.assign(Object.assign({}, fiddledTransaction), { signature: encryption_1.xyleLedgerSign(fiddledTransaction, privateKey, 'homer') });
        const regex2 = /Seed error: [a-zA-Z0-9]+[\w\s\S.]+] after 5 transaction.+/;
        expect(() => verify_ledger_1.default(ledger, publicKey, privateKey, 'homer')).toThrowError(regex2);
    });
});
