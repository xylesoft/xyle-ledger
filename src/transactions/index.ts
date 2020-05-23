import { default as createRootTransaction } from './create-root-transaction';
import { default as createTransaction } from './create-transaction';
import { default as signTransaction } from './sign-transaction';
import { default as verifyTransaction } from './verify-transaction';
import { default as verifyRootTransaction } from './verify-root-transaction';

export namespace XyleLedgerTransaction {
    export const createRoot = createRootTransaction;
    export const create = createTransaction;
    export const sign = signTransaction;
    export const verify = verifyTransaction;
    export const verifyRoot = verifyRootTransaction;
}
