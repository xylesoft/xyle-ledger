import { RootTransaction } from '../contracts/transaction';
/**
 * To test decryptions execute the following command:
 * $ openssl rsautl -decrypt -in ./msg.enc -out ./msg.json -inkey ./priv.key -oaep
 */
export interface NewRootLedgerTransaction {
    transaction: RootTransaction;
    publicKey: string;
    privateKey: string;
}
declare const _default: (value: number, timestamp: number, passphrase: string, seedAddition: string | null) => NewRootLedgerTransaction;
export default _default;
