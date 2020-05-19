import { Transaction, SignedTransaction, RootTransaction, isSignedTransaction } from '../contracts/transaction';
import UntrustedTransactionError from '../errors/untrusted-transaction-error';
import sign from '../encryption/sign';


export default (transaction: Transaction, parentTransaction: SignedTransaction | RootTransaction, privateKey: string, passphrase: string): SignedTransaction => {
    if (!isSignedTransaction(parentTransaction)) {
        throw new UntrustedTransactionError(parentTransaction);
    }

    const seededTransaction = {
        ...transaction,
        seed: parentTransaction.signature,
    };

    return {
        ...seededTransaction,
        signature: sign(seededTransaction, privateKey, passphrase),
    };
};
