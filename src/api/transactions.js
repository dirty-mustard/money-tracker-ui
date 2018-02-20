import axios from "axios";
import {API_ENDPOINT} from "../settings";

export default {

    get(criteria) {
        return axios.post(`${API_ENDPOINT}/transactions/_search`, criteria)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => Promise.reject(error));
    }
}
