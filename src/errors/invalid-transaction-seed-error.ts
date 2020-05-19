import { SignedTransaction, RootTransaction } from '../contracts/transaction';

export default class InvalidTransactionSeedError extends Error {
    constructor(seed: string, transaction: SignedTransaction | RootTransaction, iterationCount?: number) {
        const iteration = typeof iterationCount === 'number' ? ` after ${iterationCount} transaction(s) in ledger` : '';
        super(`Seed error: parent transaction seed is "${seed}".\nVerification failed for transaction [\n${JSON.stringify(transaction, null, 2)}]${iteration}`);
    }
}
