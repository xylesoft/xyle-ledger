import { SignedTransaction, RootTransaction } from '../contracts/transaction';
export interface MockChainResponse {
    transactions: (SignedTransaction | RootTransaction)[];
    publicKey: string;
    privateKey: string;
}
export declare const mockChain: (values: number[], passphrase: string) => MockChainResponse;
