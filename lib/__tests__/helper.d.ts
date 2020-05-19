import { SignedTransaction, RootTransaction } from '../contracts/transaction';
export interface MockLedgerResponse {
    transactions: (SignedTransaction | RootTransaction)[];
    publicKey: string;
    privateKey: string;
}
export declare const mockLedger: (values: number[], passphrase: string) => MockLedgerResponse;
