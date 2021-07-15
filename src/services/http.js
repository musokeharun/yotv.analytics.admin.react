import axios from "axios";
import logger from "./logService";
import {createToast} from "../utils/toasts";

const toast = createToast();

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.fire({title: "An unexpected error occurred.", icon: "error"}).then(r => console.log("Toasted"));
    }

    return Promise.reject(error);
});

axios.interceptors.request.use(config => {
    config.baseURL = apiUrl;
    return config;
}, error => Promise.reject(error));


function setJwt(jwt) {
    axios.defaults.headers.common["xchannel"] = jwt || "NTV";
}

setJwt(undefined)
let Http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};
export default Http;

export const apiUrl = process.env.REACT_APP_API;
