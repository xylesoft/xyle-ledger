import { SignedTransaction, RootTransaction } from '../contracts/transaction';
import verify from '../encryption/verify';

export default (transaction: SignedTransaction | RootTransaction, publicKey: string): boolean => {
    const { signature, ...unsignedTransaction } = transaction;

    return verify(unsignedTransaction, signature, publicKey);
};
