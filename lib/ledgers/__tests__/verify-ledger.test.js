"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../../__tests__/helper");
const verify_ledger_1 = __importDefault(require("../verify-ledger"));
describe('Testing whether verifyLedger() is working', () => {
    it('should succesfully validate an known validate ledger', () => {
        const { transactions: ledger, publicKey } = helper_1.mockChain([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        // console.log(ledger);
        expect(verify_ledger_1.default(ledger, publicKey)).toBeTruthy();
    });
});
