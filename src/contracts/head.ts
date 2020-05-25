export interface SegmentDefinition {
    file: string;
    seq: number;
}

export interface Head {
    segments: Map<string, SegmentDefinition>;
    lastSeqNumber: number;
}
