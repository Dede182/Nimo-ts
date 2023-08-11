import { InternalAxiosRequestConfig, AxiosResponse } from './../../node_modules/axios/index.d';
import axios from "axios";

type ApiRequestBodyType = {
    method : string,
    url : string,
    params? : object
}

export const ApiRequest = async <T>(value : ApiRequestBodyType) : Promise<AxiosResponse<T> | undefined> => {
    let result,
        responseType,
        parameter
    const path = "https://api.themoviedb.org/3/";

    const userToken: string =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjlmYjg4YWNhOWZlYjEwYzM5NTg4ZTk0NDlmMWZlMSIsInN1YiI6IjY0OWE1YmUxZDM1ZGVhMDEwYjgwNGNmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.faqh-TOsoAJ8qumSlm15trkP93-PoQ-l-gpyVoiYAew";

    axios.interceptors.request.use((config:InternalAxiosRequestConfig ) => {
        config.headers["Content-Type"] = "application/json";
        config.headers["Accept"] = "application/json";
        config.headers['Authorization'] = `Bearer ${userToken}`;
        return config;
    });

    if (
        value.method === "post" ||
        value.method === "patch" ||
        value.method === "put" ||
        value.method === "delete"
    ) {
        parameter = {
            baseURL: path,
            method: value.method,
            url: value.url,
            data: value.params,
        };
    } else {
        parameter = {
            baseURL: path,
            method: value.method,
            url: value.url,
            params: value.params,
            responseType,
        };
    }
    // calling api
    await axios(parameter)
        .then((response) => {
            result = response;
        })
        .catch((err) => (result = err));
    // console.log(result);
    return result;
}