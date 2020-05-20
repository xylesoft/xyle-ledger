export declare namespace XyleLedgerTransaction {
    const createRoot: (value: number, timestamp: number, passphrase: string, seedAddition: string | null) => import("./create-root-transaction").NewRootLedgerTransaction;
    const create: (value: number, previousTransaction: import("../contracts/transaction").SignedTransaction | import("../contracts/transaction").RootTransaction, privateKey: string, passphrase: string, reference?: string | undefined) => import("../contracts/transaction").SignedTransaction;
    const sign: (transaction: import("../contracts/transaction").Transaction, parentTransaction: import("../contracts/transaction").SignedTransaction | import("../contracts/transaction").RootTransaction, privateKey: string, passphrase: string) => import("../contracts/transaction").SignedTransaction;
    const verify: (transaction: import("../contracts/transaction").SignedTransaction | import("../contracts/transaction").RootTransaction, publicKey: string) => boolean;
}
