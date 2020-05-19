import { privateDecrypt } from 'crypto';
import { ENCRYPT_FORMAT } from '.';

type Hex = string;

export default (data: Hex, privateKey: string, passphrase: string): string =>
    privateDecrypt(
        {
            key: privateKey,
            passphrase
        },
        Buffer.from(data, ENCRYPT_FORMAT)
    ).toString('utf8');
