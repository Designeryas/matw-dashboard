import transactionsServices from './transactions';
import reportsServices from './reports';
import productsServices from './products';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    ...transactionsServices,
    ...reportsServices,
    ...productsServices,
};
