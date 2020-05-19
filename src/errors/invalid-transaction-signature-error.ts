import { SignedTransaction, RootTransaction } from '../contracts/transaction';

export default class InvalidTransactionSignatureError extends Error {
    constructor(transaction: SignedTransaction | RootTransaction, iterationCount?: number) {
        const { signature, ...rawTransaction } = transaction;
        const iteration = typeof iterationCount === 'number' ? ` after ${iterationCount} transaction(s) in ledger` : '';
        super(
            `Signature error: ${signature} [signature failed with data ${JSON.stringify(rawTransaction, null, 2)}]${iteration}`
        );
    }
}
