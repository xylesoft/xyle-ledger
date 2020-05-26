"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyleLedgerQuery = void 0;
const sum_transactions_1 = __importDefault(require("./sum-transactions"));
var XyleLedgerQuery;
(function (XyleLedgerQuery) {
    XyleLedgerQuery.sumTransactions = sum_transactions_1.default;
})(XyleLedgerQuery = exports.XyleLedgerQuery || (exports.XyleLedgerQuery = {}));
