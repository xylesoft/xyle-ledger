import sign from '../encryption/sign';
import { existsSync, readFileSync } from 'fs';

export default (segmentPath: string, privateKey: string, passphrase: string): string => {
    if (!existsSync(segmentPath)) {
        throw new Error(`XyleLedger signSegment() cannot find segment file: ${segmentPath}`);
    }
    return sign(readFileSync(segmentPath, 'utf-8'), privateKey, passphrase);
};
