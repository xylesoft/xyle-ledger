"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_1 = __importDefault(require("../encryption/sign"));
const generate_1 = __importDefault(require("../encryption/generate"));
const encrypt_1 = __importDefault(require("../encryption/encrypt"));
exports.default = (value, timestamp, passphrase, seedAddition) => {
    const rawRootTransaction = {
        value,
        timestamp,
        root: true,
        reference: `LedgerRootTransaction-${seedAddition ? seedAddition : 'uuid4() here'}`,
    };
    // Add seed to rootTransaction
    try {
        const { publicKey, privateKey } = generate_1.default(passphrase);
        const seededRootTransaction = Object.assign(Object.assign({}, rawRootTransaction), { seed: encrypt_1.default(JSON.stringify(rawRootTransaction), publicKey) });
        return {
            transaction: Object.assign(Object.assign({}, seededRootTransaction), { signature: sign_1.default(seededRootTransaction, privateKey, passphrase) }),
            publicKey,
            privateKey,
        };
    }
    catch (error) {
        throw error;
    }
};
