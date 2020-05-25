import { Transaction } from '../contracts/transaction';
import moment from 'moment';

export default (transaction: Transaction, format = 'YYYY-MM'): string =>
    moment.utc(transaction.timestamp).format(format);
