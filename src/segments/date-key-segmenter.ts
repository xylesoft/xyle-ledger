import { SignedTransaction } from '../contracts/transaction';
import moment from 'moment';

export default (transaction: SignedTransaction, format = 'YYYY-MM'): string =>
    moment.utc(transaction.timestamp).format(format);
