"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const _1 = require(".");
exports.default = (data, publicKey) => crypto_1.publicEncrypt(publicKey, Buffer.from(data))
    .toString(_1.ENCRYPT_FORMAT);
