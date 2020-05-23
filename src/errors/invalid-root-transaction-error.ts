import { RootTransaction } from '../contracts/transaction';

export default class InvalidRootTransactionError extends Error {
    constructor(transaction: RootTransaction, iterationCount?: number) {
        const iteration = typeof iterationCount === 'number' ? ` after ${iterationCount} transaction(s) in ledger` : '';
        super(`Root Transaction error, decrpytion of root seed was invalid.\Decrpytion failed on [\n${JSON.stringify(transaction, null, 2)}]${iteration}`);
    }
}
