import { mockLedger } from '../../__tests__/helper';
import verifyLedger from '../verify-ledger';
import { xyleLedgerSign } from '../../encryption';

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
        const { transactions: ledger, publicKey, privateKey } = mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');
        // tslint:disable
        const { signature, ...transaction } = ledger[3];
        // tslint:enable
        const fiddledTransaction = {
            ...transaction,
            value: 999.99
        };
        ledger[3] = {
            ...fiddledTransaction,
            signature: xyleLedgerSign(fiddledTransaction, privateKey, 'homer')
        };

        const regex2 = /Seed error: [a-zA-Z0-9]+[\w\s\S.]+] after 5 transaction.+/;
        expect(() => verifyLedger(ledger, publicKey)).toThrowError(regex2);
    });
});
