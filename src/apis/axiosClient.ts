import axios from "axios";
import queryString from "query-string";

import { appInfo } from "../constants/appInfos";


const axiosClient = axios.create({
    baseURL: appInfo.BASE_URL,
    paramsSerializer: params => queryString.stringify(params)
})


axiosClient.interceptors.request.use(async (config: any) => {
    config.headers = {
        Authorization: '',
        Accept: 'application/json',
        ...config.headers
    }

    

    return config
})


axiosClient.interceptors.response.use(
    res => {
        if (res.data && res.status === 200) {
            return res.data
        }
        throw new Error('Error:');

    },
    error => {
        console.error(`Error api ${JSON.stringify(error)}`);
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error message:', error.message);
        }
        throw new Error(error.message);
    }
);


export default axiosClient;