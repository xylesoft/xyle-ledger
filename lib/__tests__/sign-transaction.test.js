"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_root_transaction_1 = __importDefault(require("../create-root-transaction"));
const ledger_timestamp_1 = __importDefault(require("../ledger-timestamp"));
const verify_ledger_1 = __importDefault(require("../verify-ledger"));
const helper_1 = require("./helper");
const sign_transaction_1 = __importDefault(require("../sign-transaction"));
describe('Testing for signing of transactions', () => {
    // secondary ledger for checking error guards
    const { transaction, publicKey, privateKey } = create_root_transaction_1.default(0, ledger_timestamp_1.default(), 'homer', 'My Test Ledger');
    it('should throw a verification error due to key mistmatch on root transaction', () => {
        const { transactions: lTrans } = helper_1.mockChain([25.99, 11, 54.11, -44.43], 'homer');
        expect(() => verify_ledger_1.default(lTrans, publicKey)).toThrowError(/Signature error:.+/);
    });
    it('should be able to sign transactions', () => {
        const { transactions: lTrans, publicKey: pubKey, privateKey: privKey } = helper_1.mockChain([25.99, 11, 54.11, -44.43], 'homer');
        lTrans.push(sign_transaction_1.default({
            value: 7.99,
            reference: 'Manual sign transaction',
            timestamp: ledger_timestamp_1.default()
        }, lTrans[lTrans.length - 1], privKey, 'homer'));
        expect(verify_ledger_1.default(lTrans, pubKey)).toBeTruthy();
    });
});
