"use strict";
/**
 * used to initialise a new ledger
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_root_transaction_1 = __importDefault(require("../transactions/create-root-transaction"));
const ledger_timestamp_1 = __importDefault(require("../ledger-timestamp"));
const [node, file, ledgerName] = process.argv;
const rootTransaction = {
    timestamp: ledger_timestamp_1.default(),
    reference: `Budget Accumulator ${ledgerName}`,
    value: 0
};
const { transaction, publicKey, privateKey } = create_root_transaction_1.default(700, ledger_timestamp_1.default(), 'homer', 'My First Ledger');
console.log('Transaction:', transaction);
console.log('Public Key:\n', publicKey);
console.log('Private Key:\n', privateKey);
// export { rootTransaction };
