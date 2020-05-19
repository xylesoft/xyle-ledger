import createRootTransaction from '../create-root-transaction';
import ledgerTimestamp from '../../ledger-timestamp';
import verifyLedger from '../../ledgers/verify-ledger';
import { mockChain } from '../../__tests__/helper';
import signTransaction from '../sign-transaction';

describe.skip('Testing for signing of transactions', () => {
    // secondary ledger for checking error guards
    const { transaction, publicKey, privateKey } = createRootTransaction(
        0,
        ledgerTimestamp(),
        'homer',
        'My Test Ledger'
    );

    it('should throw a verification error due to key mistmatch on root transaction', () => {
        const { transactions: lTrans } = mockChain([25.99, 11, 54.11, -44.43], 'homer');
        expect(() => verifyLedger(lTrans, publicKey)).toThrowError(/Signature error:.+/);
    });

    it('should be able to sign transactions', () => {
        const { transactions: lTrans, publicKey: pubKey, privateKey: privKey } = mockChain(
            [25.99, 11, 54.11, -44.43],
            'homer'
        );

        lTrans.push(
            signTransaction(
                {
                    value: 7.99,
                    reference: 'Manual sign transaction',
                    timestamp: ledgerTimestamp()
                },
                lTrans[lTrans.length - 1],
                privKey,
                'homer'
            )
        );

        expect(verifyLedger(lTrans, pubKey)).toBeTruthy();
    });
});
