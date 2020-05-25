export interface SegmentDefinition {
    file: string;
    seq: number;
}
export interface Head {
    segments: {
        [segment: string]: SegmentDefinition;
    };
    lastSeqNumber: number;
}
