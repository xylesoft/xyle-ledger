export declare namespace XyleLedgerTransaction {
    const createRoot: (value: number, timestamp: number, passphrase: string, seedAddition: string | null) => import("./create-root-transaction").NewRootLedgerTransaction;
    const create: (value: number, previousTransaction: import("..").SignedTransaction | import("..").RootTransaction, privateKey: string, passphrase: string, reference?: string | undefined) => import("..").SignedTransaction;
    const sign: (transaction: import("..").Transaction, parentTransaction: import("..").SignedTransaction | import("..").RootTransaction, privateKey: string, passphrase: string) => import("..").SignedTransaction;
    const verify: (transaction: import("..").SignedTransaction | import("..").RootTransaction, publicKey: string) => boolean;
    const verifyRoot: (transaction: import("..").RootTransaction, publicKey: string, privateKey: string, passphrase: string) => boolean;
}
