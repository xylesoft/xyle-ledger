"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyleLedgerTools = void 0;
const ledger_timestamp_1 = __importDefault(require("./ledger-timestamp"));
const verify_ledger_1 = __importDefault(require("./verify-ledger"));
var XyleLedgerTools;
(function (XyleLedgerTools) {
    XyleLedgerTools.timestamp = ledger_timestamp_1.default;
    XyleLedgerTools.verifyLedger = verify_ledger_1.default;
})(XyleLedgerTools = exports.XyleLedgerTools || (exports.XyleLedgerTools = {}));
