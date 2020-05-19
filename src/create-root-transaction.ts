import { RootTransaction } from './contracts/transaction';
import sign from './encryption/sign';
import generate from './encryption/generate';
import encrypt from './encryption/encrypt';

/**
 * To test decryptions execute the following command:
 * $ openssl rsautl -decrypt -in ./msg.enc -out ./msg.json -inkey ./priv.key -oaep
 */

export interface NewRootLedgerTransaction {
    transaction: RootTransaction;
    publicKey: string;
    privateKey: string;
}

export default (value: number, timestamp: number, passphrase: string, seedAddition: string | null): NewRootLedgerTransaction => {
    const rawRootTransaction = {
        value,
        timestamp,
        root: true,
        reference: `LedgerRootTransaction-${seedAddition ? seedAddition : 'uuid4() here'}`,
    } as Omit<RootTransaction, 'seed' | 'signature'>;

    // Add seed to rootTransaction
    try {
        const { publicKey, privateKey } = generate(passphrase);
        const seededRootTransaction = {
            ...rawRootTransaction,
            seed: encrypt(JSON.stringify(rawRootTransaction), publicKey),
        } as Omit<RootTransaction, 'signature'>;

        return {
            transaction: {
                ...seededRootTransaction,
                signature: sign(seededRootTransaction, privateKey, passphrase),
            } as RootTransaction,
            publicKey,
            privateKey,
        };
    } catch (error) {
        throw error;
    }
};
