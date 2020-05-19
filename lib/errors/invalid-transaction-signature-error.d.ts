import { SignedTransaction, RootTransaction } from '../contracts/transaction';
export default class InvalidTransactionSignatureError extends Error {
    constructor(transaction: SignedTransaction | RootTransaction, iterationCount?: number);
}
