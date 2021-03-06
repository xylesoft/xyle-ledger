import { SignedTransaction, isSignedTransaction, isRootTransaction } from '../contracts/transaction';
import InvalidTransactionSignatureError from '../errors/invalid-transaction-signature-error';
import verifyTransaction from '../transactions/verify-transaction';
import verify from '../encryption/verify';
import InvalidTransactionSeedError from '../errors/invalid-transaction-seed-error';
import verifyRootTransaction from '../transactions/verify-root-transaction';
import InvalidRootTransactionError from '../errors/invalid-root-transaction-error';

const sortTransactionsDescendingOrder = (parent: SignedTransaction, child: SignedTransaction) => {
    if (parent.timestamp === child.timestamp) return 0;

    return parent.timestamp > child.timestamp ? -1 : 1; // start from newest transaction first
};

export default (transactions: SignedTransaction[], publicKey: string, privateKey: string, passphrase: string) => {
    let parentTransaction = null;
    let iterationCount = 0;
    let verifiedRoot = false;

    for (const transaction of transactions.sort(sortTransactionsDescendingOrder)) {
        if (!verifyTransaction(transaction, publicKey)) {
            throw new InvalidTransactionSignatureError(transaction, iterationCount);
        }

        if (isRootTransaction(transaction)) {
            if (!verifyRootTransaction(transaction, publicKey, privateKey, passphrase)) {
                throw new InvalidRootTransactionError(transaction, iterationCount);
            }
            verifiedRoot = true;
        }

        if (isSignedTransaction(parentTransaction)) {
            // eslint-disable-next-line
            const { signature, ...unsignedTransaction } = transaction;
            if (!verify(unsignedTransaction, parentTransaction.seed, publicKey)) {
                throw new InvalidTransactionSeedError(parentTransaction.seed, transaction, iterationCount);
            }
        }

        iterationCount++;
        parentTransaction = transaction;
    }

    return true && verifiedRoot;
};
