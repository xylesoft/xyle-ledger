"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const _1 = require(".");
exports.default = (json, signature, publicKey) => {
    const verifier = crypto_1.createVerify(_1.SHA_CONFIG)
        .update(JSON.stringify(json));
    return verifier.verify(publicKey, signature, _1.ENCRYPT_FORMAT);
};
