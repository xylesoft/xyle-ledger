import { mockLedger } from '../../__tests__/helper';
import verifyTransaction from '../verify-transaction';

describe('Testing verify transactions', () => {
    it('should verify a standard transaction as expected', () => {
        const { transactions, publicKey } = mockLedger([12], 'homer');

        expect(verifyTransaction(transactions[0], publicKey)).toBeTruthy();
    });

    it('should throw a verification error as expected', () => {
        const { transactions } = mockLedger([12], 'homer');

        expect(() => verifyTransaction(transactions[0], 'xxxxxxxx')).toThrowError();
    });
});
