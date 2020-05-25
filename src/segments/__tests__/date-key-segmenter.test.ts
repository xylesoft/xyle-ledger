import { Transaction, SignedTransaction } from '../../contracts/transaction';
import moment from 'moment';
import dateKeySegmenter from '../date-key-segmenter';

describe('Make sure date key segmenter works as expected', () => {
    it('should product a YYYY-MM format by default', () => {
        const transaction = {
            timestamp: Number(moment.utc('2020-05-04').format('x')),
            value: 10,
            reference: 'Test'
        } as Transaction;

        expect(dateKeySegmenter(transaction as SignedTransaction)).toEqual('2020-05');
    });
});
