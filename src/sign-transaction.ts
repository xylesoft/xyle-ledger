import { Transaction, SignedTransaction, RootTransaction, isSignedTransaction } from './contracts/transaction';
import UntrustedTransactionError from './errors/untrusted-transaction-error';
import sign from './encryption/sign';


export default (transaction: Transaction, seedTransaction: SignedTransaction | RootTransaction, privateKey: string, passphrase: string): SignedTransaction => {
    if (!isSignedTransaction(seedTransaction)) {
        throw new UntrustedTransactionError(seedTransaction);
    }

    const seededTransaction = {
        ...transaction,
        seed: seedTransaction.signature,
    };

    return {
        ...seededTransaction,
        signature: sign(seededTransaction, privateKey, passphrase),
    };
};
