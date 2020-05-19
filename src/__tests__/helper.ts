import { SignedTransaction, RootTransaction, Transaction } from '../contracts/transaction';
import ledgerTimestamp from '../ledger-timestamp';
import createRootTransaction from '../transactions/create-root-transaction';
import signTransaction from '../transactions/sign-transaction';


export interface MockChainResponse {
    transactions: (SignedTransaction | RootTransaction)[];
    publicKey: string;
    privateKey: string;
}

export const mockChain = (values: number[], passphrase: string): MockChainResponse => {
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
