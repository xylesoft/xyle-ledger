export type Sha256DigestHex = string;
export type UniqueLedgerIdentifier = string;

export interface Transaction {
    timestamp: number;
    value: number;
    reference?: string;
}

export interface SignedTransaction extends Transaction {
    seed: Sha256DigestHex; // the signature of the previous transaction.
    signature: Sha256DigestHex;
}

export interface RootTransaction extends Transaction {
    root: true;
    value: number;
    reference: UniqueLedgerIdentifier; //A unique reference must be provided on the root transaction (ledger seed)
    seed: string; // An encryption string from a pub/priv encrpyted value of the transaction without a seed and signature.
    signature: Sha256DigestHex; // A sha256 hash using the seed as a salt to the Root Transaction without a seed.
}

export const isRootTransaction = (transaction: unknown): transaction is RootTransaction =>
    Boolean(
        transaction !== null &&
        typeof transaction === 'object' &&
        (transaction as RootTransaction)?.root === true
    );

export const isSignedTransaction = (transaction: unknown): transaction is SignedTransaction =>
    Boolean(
        transaction !== null &&
        typeof transaction === 'object' &&
        (transaction as SignedTransaction)?.signature &&
        (transaction as SignedTransaction)?.seed
    );
