export declare namespace XyleLedgerTools {
    const timestamp: () => number;
    const verifyLedger: (transactions: import("..").SignedTransaction[], publicKey: string, privateKey: string, passphrase: string) => boolean;
}
