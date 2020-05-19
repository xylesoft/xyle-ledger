import { SignedTransaction, RootTransaction } from './contracts/transaction';
import InvalidTransactionSignatureError from './errors/invalid-transaction-signature-error';
import verifyTransaction from './verify-transaction';

export default (transactions: SignedTransaction[], publicKey: string) => {

// console.log(transactions
//     .sort((parent: SignedTransaction, child: SignedTransaction) => {
//         if (parent.timestamp === child.timestamp) return 0;

//         return parent.timestamp < child.timestamp ? -1 : 1;
//     }).reverse());

    transactions
        .sort((parent: SignedTransaction, child: SignedTransaction) => {
            if (parent.timestamp === child.timestamp) return 0;

            return parent.timestamp < child.timestamp ? -1 : 1;
        })
        .forEach((transaction: SignedTransaction | RootTransaction) => {
            if (!verifyTransaction(transaction, publicKey)) {
                throw new InvalidTransactionSignatureError(transaction);
            }
        });

    return true;
};
