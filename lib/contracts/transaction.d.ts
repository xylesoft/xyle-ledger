export declare type Sha256DigestHex = string;
export declare type UniqueLedgerIdentifier = string;
export interface Transaction {
    timestamp: number;
    value: number;
    reference?: string;
}
export interface SignedTransaction extends Transaction {
    seed: Sha256DigestHex;
    signature: Sha256DigestHex;
}
export interface RootTransaction extends Transaction {
    root: true;
    value: number;
    reference: UniqueLedgerIdentifier;
    seed: string;
    signature: Sha256DigestHex;
}
export declare const isRootTransaction: (transaction: unknown) => transaction is RootTransaction;
export declare const isSignedTransaction: (transaction: unknown) => transaction is SignedTransaction;
