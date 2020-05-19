import { Transaction, SignedTransaction, RootTransaction } from './contracts/transaction';
declare const _default: (transaction: Transaction, seedTransaction: SignedTransaction | RootTransaction, privateKey: string, passphrase: string) => SignedTransaction;
export default _default;
