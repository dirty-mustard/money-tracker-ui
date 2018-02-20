import axios from "axios";
import {API_ENDPOINT} from "../settings";

export default {

    create(payload) {
        return axios.post(`${API_ENDPOINT}/rules`, payload)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => Promise.reject(error));
    }
}
