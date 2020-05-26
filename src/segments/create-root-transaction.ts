import { RootTransaction } from '../contracts/transaction';
import sign from '../encryption/sign';
import moment from 'moment';

export interface NewRootLedgerTransaction {
    transaction: RootTransaction;
    publicKey: string;
    privateKey: string;
}

export default (previousSegmentTotalValue: number, seed: string, previousSegmentKey: string, privateKey: string, passphrase: string): RootTransaction => {
    const rawRootTransaction = {
        value: previousSegmentTotalValue,
        timestamp: Number(moment.utc().format('x')),
        root: true,
        reference: `SegmentRootTransaction: descendant of segment "${previousSegmentKey}".`,
    } as Omit<RootTransaction, 'seed' | 'signature'>;

    try {
        const seededRootTransaction = {
            ...rawRootTransaction,
            seed,
        } as Omit<RootTransaction, 'signature'>;

        return {
            ...seededRootTransaction,
            signature: sign(seededRootTransaction, privateKey, passphrase),
        } as RootTransaction;
    } catch (error) {
        throw error;
    }
};
