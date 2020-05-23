import { RootTransaction, Transaction } from '../contracts/transaction';
import verifyTransaction from './verify-transaction';
import decrypt from '../encryption/decrypt';

export default (
    transaction: RootTransaction,
    publicKey: string,
    privateKey: string,
    passphrase: string
): boolean => {
    if (verifyTransaction(transaction, publicKey)) {
        const { seed, ...rawTransaction } = transaction;
        try {
            const decryptedTransaction = JSON.parse(decrypt(seed, privateKey, passphrase)) as Transaction;
            return rawTransaction.value === decryptedTransaction.value &&
                rawTransaction.timestamp === decryptedTransaction.timestamp &&
                rawTransaction.reference === decryptedTransaction.reference;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return false;
};
