import { SignedTransaction, RootTransaction } from '../contracts/transaction';

export default class InvalidTransactionSignatureError extends Error {
    constructor(transaction: SignedTransaction | RootTransaction) {
        const { signature, ...rawTransaction } = transaction;
        super(`Signature error: ${signature} [signature failed with data ${JSON.stringify(rawTransaction)}]`);
    }
}
