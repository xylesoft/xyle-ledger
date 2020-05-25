export interface SegmentDefinition {
    file: string;
    seq: number;
}
export default interface Head {
    segments: Map<string, SegmentDefinition>;
    lastSeqNumber: number;
}
