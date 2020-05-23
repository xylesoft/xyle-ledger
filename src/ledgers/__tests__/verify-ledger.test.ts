import { mockLedger } from '../../__tests__/helper';
import verifyLedger from '../verify-ledger';
import { xyleLedgerSign } from '../../encryption';
import sign from '../../encryption/sign';

describe('Testing whether verifyLedger() is working', () => {
    it('should succesfully validate an known validate ledger', () => {
        const { transactions: ledger, publicKey, privateKey } = mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');

        expect(verifyLedger(ledger, publicKey, privateKey, 'homer')).toBeTruthy();
    });

    it('should be able to validate a ledger containing only the root transaction', () => {
        const { transactions: ledger, publicKey, privateKey } = mockLedger([], 'homer');

        expect(verifyLedger(ledger, publicKey, privateKey, 'homer')).toBeTruthy();
    });

    it('should return FALSE if no root transaction exists', () => {
        const { transactions: ledger, publicKey, privateKey } = mockLedger([1, 23, 5], 'homer');

        ledger.shift(); // remove root transaction

        expect(verifyLedger(ledger, publicKey, privateKey, 'homer')).toBeFalsy();
    });


    it('should throw an error if no root transaction exists', () => {
        const { transactions: ledger, publicKey, privateKey } = mockLedger([100], 'homer');

        ledger[0].seed = ledger[0].seed + '1234567890';
        // eslint-disable-next-line
        const { signature: dump, ...rawRootTransaction } = ledger[0];
        ledger[0].signature = sign(rawRootTransaction, privateKey, 'homer');
        ledger[1].seed = ledger[0].signature;
        // eslint-disable-next-line
        const { signature: dump1, ...rawTransaction } = ledger[1];
        ledger[1].signature = sign(rawTransaction, privateKey, 'homer');

        const regex = /Root Transaction error, decrpytion of root seed was invalid.+/;
        expect(() => verifyLedger(ledger, publicKey, privateKey, 'homer')).toThrowError(regex);
    });

    it('should throw a transaction signature error', () => {
        const { transactions: ledger, publicKey, privateKey } = mockLedger([1, 2, 3, 5, 8, 13, 21, 34], 'homer');

        ledger[0].seed = 'moomoo';
        const regex = /Signature error: [a-zA-Z0-9]+ \[signature failed with data .+/;
        expect(() => verifyLedger(ledger, publicKey, privateKey, 'homer')).toThrowError(regex);
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
        expect(() => verifyLedger(ledger, publicKey, privateKey, 'homer')).toThrowError(regex2);
    });
});
