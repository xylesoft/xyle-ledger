import { mockChain } from '../../__tests__/helper';
import verifyLedger from '../verify-ledger';

describe('Testing whether verifyLedger() is working', () => {
    it('should succesfully validate an known validate ledger', () => {
        const { transactions: ledger, publicKey } = mockChain([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
// console.log(ledger);
        expect(verifyLedger(ledger, publicKey)).toBeTruthy();
    });
});
