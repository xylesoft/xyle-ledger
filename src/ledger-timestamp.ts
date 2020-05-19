import moment from 'moment';

export default (): number => Number(moment.utc().format('x'));
