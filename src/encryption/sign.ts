import { createSign } from 'crypto';
import { SHA_CONFIG, ENCRYPT_FORMAT } from '.';

export default (json: any, privateKey: string, passphrase: string): string => {
    const signer = createSign(SHA_CONFIG).update(JSON.stringify(json));

    return signer.sign(
        {
            key: privateKey,
            passphrase
        },
        ENCRYPT_FORMAT
    );
};
