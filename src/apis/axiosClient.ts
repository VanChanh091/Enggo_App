import axios from "axios";
import queryString from "query-string";

import { appInfo } from "../constants/appInfos";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async () => {
    const res = await AsyncStorage.getItem('auth');

    return res ? JSON.parse(res).accesstoken : '';
};

const axiosClient = axios.create({
    baseURL: appInfo.BASE_URL,
    paramsSerializer: params => queryString.stringify(params)
})


axiosClient.interceptors.request.use(async (config: any) => {
    // const accesstoken = await getAccessToken();
    // console.log("accesstoken :", accesstoken);

    config.headers = {
        // Authorization: accesstoken ? `Bearer ${accesstoken}` : '',
        // Authenrization:'',
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        ...config.headers
    }


    config.data;
    return config
})


axiosClient.interceptors.response.use(
    res => res,
    error => {
        console.error(`Error: ${error.message}`);
        console.error('Config:', JSON.stringify(error.config));
        console.error('Request:', JSON.stringify(error.request));
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response.data));
        }
        throw error;
    }
);



export default axiosClient;