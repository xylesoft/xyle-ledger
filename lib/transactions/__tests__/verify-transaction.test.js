"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../__tests__/helper");
const verify_transaction_1 = __importDefault(require("../verify-transaction"));
describe('Testing verify transactions', () => {
    it('should verify a standard transaction as expected', () => {
        const { transactions, publicKey } = helper_1.mockLedger([12], 'homer');
        expect(verify_transaction_1.default(transactions[0], publicKey)).toBeTruthy();
    });
    it('should throw a verification error as expected', () => {
        const { transactions } = helper_1.mockLedger([12], 'homer');
        expect(() => verify_transaction_1.default(transactions[0], 'xxxxxxxx')).toThrowError();
    });
});
