"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const _1 = require(".");
exports.default = (json, privateKey, passphrase) => {
    const signer = crypto_1.createSign(_1.SHA_CONFIG).update(JSON.stringify(json));
    return signer.sign({
        key: privateKey,
        passphrase
    }, _1.ENCRYPT_FORMAT);
};
