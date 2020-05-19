import { SignedTransaction, RootTransaction } from '../contracts/transaction';
export default class UntrustedTransactionError extends Error {
    constructor(transaction: SignedTransaction | RootTransaction);
}
