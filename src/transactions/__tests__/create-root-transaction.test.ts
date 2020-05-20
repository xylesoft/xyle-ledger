
import createRootTransaction from '../create-root-transaction';
import { RootTransaction } from '../../contracts/transaction';
import { xyleLedgerDecrypt, xyleLedgerVerify } from '../../encryption';
import ledgerTimestamp from '../../ledger-timestamp';

describe('Testing for the creation of a root transactions', () => {
    const value = 700;
    const timestamp = ledgerTimestamp();
    const { transaction, publicKey, privateKey } = createRootTransaction(value, timestamp, 'homer', 'My Test Ledger');
    // console.log(transaction);

    it('Test that a root transaction is created and the properties match', () => {
        expect(transaction.value).toEqual(value);
        expect(transaction.timestamp).toEqual(timestamp);
        expect(transaction.reference).toEqual('LedgerRootTransaction-My Test Ledger');
        expect(transaction).toHaveProperty('seed');
        expect(transaction).toHaveProperty('signature');
    });

    it('should be able to decrypt the seed', () => {
        // Validate seed
        const { seed } = transaction;
        const decryptedJson = JSON.parse(
            xyleLedgerDecrypt(seed, privateKey, 'homer')
        ) as RootTransaction;

        expect(transaction.value).toEqual(decryptedJson.value);
        expect(transaction.timestamp).toEqual(decryptedJson.timestamp);
        expect(transaction.reference).toEqual(decryptedJson.reference);
    });

    it('should be able to check signature', () => {
        const { signature, ...seededTransaction } = transaction;
        expect(xyleLedgerVerify(seededTransaction, signature, publicKey)).toBeTruthy();
    });
});
