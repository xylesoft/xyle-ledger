import { createVerify } from 'crypto';
import { SHA_CONFIG, ENCRYPT_FORMAT } from '.';

type Hex = string;

export default (json: any, signature: Hex, publicKey: string): boolean => {
    const verifier = createVerify(SHA_CONFIG)
        .update(JSON.stringify(json));

    return verifier.verify(publicKey, signature, ENCRYPT_FORMAT);
};
