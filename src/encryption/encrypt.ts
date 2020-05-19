import { publicEncrypt } from 'crypto';
import { ENCRYPT_FORMAT } from '.';

type Hex = string;

export default (data: string, publicKey: string): Hex =>
    publicEncrypt(publicKey, Buffer.from(data))
        .toString(ENCRYPT_FORMAT);
