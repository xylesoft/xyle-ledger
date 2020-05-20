import { SignedTransaction, RootTransaction, Transaction } from '../contracts/transaction';
import ledgerTimestamp from '../ledgers/ledger-timestamp';
import createRootTransaction from '../transactions/create-root-transaction';
import signTransaction from '../transactions/sign-transaction';

export interface MockLedgerResponse {
    transactions: (SignedTransaction | RootTransaction)[];
    publicKey: string;
    privateKey: string;
}

export const mockLedger = (values: number[], passphrase: string): MockLedgerResponse => {
    const timestamp = ledgerTimestamp();
    const { transaction: rootTransaction, publicKey, privateKey } = createRootTransaction(0, timestamp, passphrase, 'My Test Ledger');
    const transactions: (SignedTransaction | RootTransaction)[] = [
        rootTransaction,
    ];

    values.forEach((value: number, index: number) => {
        transactions.push(
            signTransaction(
                {
                    value,
                    reference: `${index + 1}. Transaction`,
                    timestamp: ledgerTimestamp(),
                } as Transaction,
                transactions[transactions.length - 1],
                privateKey,
                passphrase
            )
        );
    });

    return {
        transactions,
        publicKey,
        privateKey,
    };
};
