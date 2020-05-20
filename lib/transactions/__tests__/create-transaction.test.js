"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../__tests__/helper");
const create_transaction_1 = __importDefault(require("../create-transaction"));
const verify_transaction_1 = __importDefault(require("../verify-transaction"));
describe('Testing create transactions', () => {
    const { transactions, publicKey, privateKey } = helper_1.mockLedger([1, 2, 3, 5], 'homer');
    it('should create a standard transaction as expected', () => {
        const transaction = create_transaction_1.default(25, transactions[0], privateKey, 'homer', 'My super test!');
        expect(transaction.seed).toEqual(transactions[0].signature);
        expect(transaction.value).toEqual(25);
        expect(verify_transaction_1.default(transaction, publicKey)).toBeTruthy();
    });
});
