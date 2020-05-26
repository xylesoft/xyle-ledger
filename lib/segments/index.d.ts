export declare namespace XyleLedgerSegments {
    const dateKeySegmenter: (transaction: import("..").Transaction, format?: string) => string;
    const signSegment: (segmentPath: string, privateKey: string, passphrase: string) => string;
}
