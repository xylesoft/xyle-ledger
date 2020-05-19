"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockChain = void 0;
const ledger_timestamp_1 = __importDefault(require("../ledger-timestamp"));
const create_root_transaction_1 = __importDefault(require("../create-root-transaction"));
const sign_transaction_1 = __importDefault(require("../sign-transaction"));
exports.mockChain = (values, passphrase) => {
    const timestamp = ledger_timestamp_1.default();
    const { transaction, publicKey, privateKey } = create_root_transaction_1.default(0, timestamp, passphrase, 'My Test Ledger');
    const transactions = [
        transaction,
    ];
    values.forEach((value, index) => {
        transactions.push(sign_transaction_1.default({
            value,
            reference: `${index + 1}. Transaction`,
            timestamp: ledger_timestamp_1.default(),
        }, transaction, privateKey, passphrase));
    });
    return {
        transactions,
        publicKey,
        privateKey,
    };
};
