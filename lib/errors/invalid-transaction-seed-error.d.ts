import { SignedTransaction, RootTransaction } from '../contracts/transaction';
export default class InvalidTransactionSeedError extends Error {
    constructor(seed: string, transaction: SignedTransaction | RootTransaction, iterationCount?: number);
}
