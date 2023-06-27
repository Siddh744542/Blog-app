import axios from "axios";

import {API_NOTIFICATION_MESSAGES, SERVICE_URL}  from "../constants/config.js";
import { getAccessToken, getType } from "../utils/common-utils.js";
const API_URL = "https://blog-app-jk84.onrender.com"
const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers : {
        "Accept": "application/json, form-data", 
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        } else if(config.TYPE.query){
            config.url = config.url + "/" + config.TYPE.query
        }
        return config;
    },
    function(err){
        return Promise.reject(err);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        return ProcessResponse(response);
    },
    function(err){
        return (processError(err));
    }
)

const ProcessResponse = (response) =>{
    if(response?.status === 200){
        return {isSuccess: true, data : response.data}
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (err) =>{
    
    if(err.response){
        console.log("error in response", err.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code : err.response.status
        }
    } else if (err.request){
        console.log("error in request", err.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code : ""
        }
    } else {
        console.log("error in Network", err.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code : ""
        }
    }
}

const API = {};

for(const [key, value] of Object.entries(SERVICE_URL)){
    API[key] = (body) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method==='DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE:getType(value,body),
        })
}
export {API};

