import { mockLedger } from '../../__tests__/helper';
import verifyLedger from '../verify-ledger';
import { sign } from '../../encryption';

describe('Testing whether verifyLedger() is working', () => {
    it('should succesfully validate an known validate ledger', () => {
        const { transactions: ledger, publicKey } = mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');

        expect(verifyLedger(ledger, publicKey)).toBeTruthy();
    });

    it('should throw a transaction signature error', () => {
        const { transactions: ledger, publicKey } = mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');

        ledger[0].seed = 'moomoo';
        const regex = /Signature error: [a-zA-Z0-9]+ \[signature failed with data .+/;
        expect(() => verifyLedger(ledger, publicKey)).toThrowError(regex);
    });


    it('should throw a transaction seed error, one of the transaction has been tampered with', () => {
        const { transactions: ledger, publicKey } = mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        const { privateKey: fakePrivKey } = mockLedger([1], 'homer');
        const  { ...origTransaction } = ledger[3];
        const { signature, ...transaction } = ledger[3];

        const fiddledTransaction = {
            ...transaction,
            value: 999.99,
        };
        ledger[3] = {
            ...fiddledTransaction,
            signature: sign(fiddledTransaction, fakePrivKey, 'homer'),
        };

        const regex2 = /Signature error: [a-zA-Z0-9]+ \[signature failed with data [\w\s\S.]+] after 5 transaction.+/;
        expect(() => verifyLedger(ledger, publicKey)).toThrowError(regex2);
    });
});
