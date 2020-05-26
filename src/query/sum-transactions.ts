import { SignedTransaction, RootTransaction, isRootTransaction } from '../contracts/transaction';

export default (transactions: (SignedTransaction | RootTransaction)[], includeRoot = false): number => {
    let sum = 0;

    transactions.forEach(transaction => {
        if (!includeRoot && isRootTransaction(transaction)) {
            return; // skip
        }

        sum += transaction.value;
    });

    return sum;
};
