import { SignedTransaction, RootTransaction } from '../contracts/transaction';

export default class UntrustedTransactionError extends Error {
    constructor(transaction: SignedTransaction | RootTransaction) {
        super(`Untrusted Transaction Error: missing signature and/or seed [failed with data ${JSON.stringify(transaction)}]`);
    }
}
