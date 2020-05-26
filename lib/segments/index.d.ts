export declare namespace XyleLedgerSegments {
    const dateKeySegmenter: (transaction: import("..").Transaction, format?: string) => string;
    const sign: (segmentPath: string, privateKey: string, passphrase: string) => string;
    const createRootTransaction: (previousSegmentTotalValue: number, seed: string, previousSegmentKey: string, privateKey: string, passphrase: string) => import("..").RootTransaction;
}
