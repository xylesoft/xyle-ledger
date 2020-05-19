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
const create_root_transaction_1 = __importDefault(require("../create-root-transaction"));
const decrypt_1 = __importDefault(require("../encryption/decrypt"));
const verify_1 = __importDefault(require("../encryption/verify"));
const ledger_timestamp_1 = __importDefault(require("../ledger-timestamp"));
describe('Testing for the creation of a root transactions', () => {
    const value = 700;
    const timestamp = ledger_timestamp_1.default();
    const { transaction, publicKey, privateKey } = create_root_transaction_1.default(value, timestamp, 'homer', 'My Test Ledger');
    // console.log(transaction);
    it('Test that a root transaction is created and the properties match', () => {
        expect(transaction.value).toEqual(value);
        expect(transaction.timestamp).toEqual(timestamp);
        expect(transaction.reference).toEqual(`LedgerRootTransaction-My Test Ledger`);
        expect(transaction).toHaveProperty('seed');
        expect(transaction).toHaveProperty('signature');
    });
    it('should be able to decrypt the seed', () => {
        // Validate seed
        const { seed, signature } = transaction, rawTransaction = __rest(transaction, ["seed", "signature"]);
        const decryptedSeed = decrypt_1.default(seed, privateKey, 'homer');
        const decryptedJson = JSON.parse(decryptedSeed);
        expect(transaction.value).toEqual(decryptedJson.value);
        expect(transaction.timestamp).toEqual(decryptedJson.timestamp);
        expect(transaction.reference).toEqual(decryptedJson.reference);
    });
    it('should be able to check signature', () => {
        const { signature } = transaction, seededTransaction = __rest(transaction, ["signature"]);
        expect(verify_1.default(seededTransaction, signature, publicKey)).toBeTruthy();
    });
});
