import { default as ledgerTimestamp } from './ledger-timestamp';
import { default as _verifyLedger } from './verify-ledger';

export namespace XyleLedgerTools {
    export const timestamp = ledgerTimestamp;
    export const verifyLedger = _verifyLedger;
}
