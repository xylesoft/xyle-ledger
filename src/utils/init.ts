/**
 * used to initialise a new ledger
 */

import { RootTransaction } from '../contracts/transaction';
import createRootTransaction from '../transactions/create-root-transaction';
import ledgerTimestamp from '../ledger-timestamp';

const [node, file, ledgerName] = process.argv;

const rootTransaction = {
    timestamp: ledgerTimestamp(),
    reference: `Budget Accumulator ${ledgerName}`,
    value: 0
} as RootTransaction;

const { transaction, publicKey, privateKey } = createRootTransaction(
    700,
    ledgerTimestamp(),
    'homer',
    'My First Ledger'
);

console.log('Transaction:', transaction);
console.log('Public Key:\n', publicKey);
console.log('Private Key:\n', privateKey);

// export { rootTransaction };
