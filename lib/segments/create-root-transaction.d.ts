import { RootTransaction } from '../contracts/transaction';
export interface NewRootLedgerTransaction {
    transaction: RootTransaction;
    publicKey: string;
    privateKey: string;
}
declare const _default: (previousSegmentTotalValue: number, seed: string, previousSegmentKey: string, privateKey: string, passphrase: string) => RootTransaction;
export default _default;
