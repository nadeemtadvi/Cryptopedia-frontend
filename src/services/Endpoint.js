
import axios from "axios";

export const BaseUrl = 'http://localhost:5000';

const instance = axios.create({
    baseURL: BaseUrl,
    withCredentials: true,  
    // headers: {
    //     'Content-Type': 'application/json', 
    // }
});

export const  get = (url, params ) => instance.get(url, {params});
export const  post = (url, data) => instance.post(url, data);
export const  patch = (url, data) => instance.patch(url, data);
export const  dele = (url) => instance.delete(url);



instance.interceptors.request.use(function (config) {
    console.log('Request Config:', config);
    return config;
}, function (error) {
    console.error('Request Error:', error);
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    console.log('Apis Response', response);
    return response;
}, function (error) {
    console.log('Api Error', error.message);
    return Promise.reject(error);
});

