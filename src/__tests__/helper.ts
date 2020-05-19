import { SignedTransaction, RootTransaction, Transaction } from '../contracts/transaction';
import ledgerTimestamp from '../ledger-timestamp';
import createRootTransaction from '../create-root-transaction';
import signTransaction from '../sign-transaction';


export interface MockChainResponse {
    transactions: (SignedTransaction | RootTransaction)[];
    publicKey: string;
    privateKey: string;
}

export const mockChain = (values: number[], passphrase: string): MockChainResponse => {
    const timestamp = ledgerTimestamp();
    const { transaction, publicKey, privateKey } = createRootTransaction(0, timestamp, passphrase, 'My Test Ledger');
    const transactions: (SignedTransaction | RootTransaction)[] = [
        transaction,
    ];

    values.forEach((value: number, index: number) => {
        transactions.push(
            signTransaction(
                {
                    value,
                    reference: `${index + 1}. Transaction`,
                    timestamp: ledgerTimestamp(),
                } as Transaction,
                transaction,
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
