"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const _1 = require(".");
exports.default = (data, privateKey, passphrase) => crypto_1.privateDecrypt({
    key: privateKey,
    passphrase
}, Buffer.from(data, _1.ENCRYPT_FORMAT)).toString('utf8');
