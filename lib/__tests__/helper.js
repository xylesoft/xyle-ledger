"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLedger = void 0;
const ledger_timestamp_1 = __importDefault(require("../ledgers/ledger-timestamp"));
const create_root_transaction_1 = __importDefault(require("../transactions/create-root-transaction"));
const sign_transaction_1 = __importDefault(require("../transactions/sign-transaction"));
exports.mockLedger = (values, passphrase) => {
    const timestamp = ledger_timestamp_1.default();
    const { transaction: rootTransaction, publicKey, privateKey } = create_root_transaction_1.default(0, timestamp, passphrase, 'My Test Ledger');
    const transactions = [
        rootTransaction,
    ];
    values.forEach((value, index) => {
        transactions.push(sign_transaction_1.default({
            value,
            reference: `${index + 1}. Transaction`,
            timestamp: ledger_timestamp_1.default(),
        }, transactions[transactions.length - 1], privateKey, passphrase));
    });
    return {
        transactions,
        publicKey,
        privateKey,
    };
};
