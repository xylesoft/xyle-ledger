import { SignedTransaction, Transaction, RootTransaction } from '../contracts/transaction';
import signTransaction from './sign-transaction';
import ledgerTimestamp from '../ledgers/ledger-timestamp';

export default (
    value: number,
    previousTransaction: SignedTransaction | RootTransaction,
    privateKey: string,
    passphrase: string,
    reference?: string
): SignedTransaction =>
    signTransaction(
        {
            value,
            reference,
            timestamp: ledgerTimestamp(),
        } as Transaction,
        previousTransaction,
        privateKey,
        passphrase
    );
