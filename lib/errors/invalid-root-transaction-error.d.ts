import { RootTransaction } from '../contracts/transaction';
export default class InvalidRootTransactionError extends Error {
    constructor(transaction: RootTransaction, iterationCount?: number);
}
