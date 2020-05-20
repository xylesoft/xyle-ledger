import { mockLedger } from '../../__tests__/helper';
import createTransaction from '../create-transaction';
import verifyTransaction from '../verify-transaction';

describe('Testing create transactions', () => {
    const { transactions, publicKey, privateKey } = mockLedger([1, 2, 3, 5], 'homer');

    it('should create a standard transaction as expected', () => {
        const transaction = createTransaction(25, transactions[0], privateKey, 'homer', 'My super test!');

        expect(transaction.seed).toEqual(transactions[0].signature);
        expect(transaction.value).toEqual(25);
        expect(verifyTransaction(transaction, publicKey)).toBeTruthy();
    });
});
