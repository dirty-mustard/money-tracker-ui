import axios from "axios";
import {API_ENDPOINT} from "../settings";
import _ from 'lodash';

export default {

    create(criteria) {

        let crit = { ...criteria };
        if (_.has(criteria, 'amountFrom') || _.has(criteria, 'amountTo')) {
            crit = _.omit(crit, ['amountFrom', 'amountTo']);
            crit = { ...crit, amount: {} };
            if (_.has(criteria, 'amountFrom')) {
                crit.amount.from = criteria.amountFrom;
            }

            if (_.has(criteria, 'amountTo')) {
                crit.amount.to = criteria.amountTo;
            }
        }

        if (_.has(criteria, 'tags')) {
            crit = _.omit(crit, 'tags');
            crit.tags = criteria.tags.map(tag => tag.value);
        }

        return axios.post(`${API_ENDPOINT}/filters`, crit)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => Promise.reject(error));
    }
}
