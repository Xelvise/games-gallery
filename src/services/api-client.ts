import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      key: import.meta.env.VITE_RAWG_API_KEY
    }
});

export interface ResponseSchema<T> {
    count: number;
    next: string|null;
    previous: string|null;
    results: T[];
}

export default class APIClient<T> {
    path: string;
    constructor(path: string) {
        this.path = path;
    }
    fetchData = (queryParams?: AxiosRequestConfig) => {
        return axiosInstance.get<ResponseSchema<T>>(this.path, {...queryParams}).then(res => res.data);
    }
    postData = (payload?: T) => {
        return axiosInstance.post<ResponseSchema<T>>(this.path, payload).then(res => res.data);
    }
    fetchDetail = (queryParams?: AxiosRequestConfig) => {
        return axiosInstance.get<T>(this.path, {...queryParams}).then(res => res.data);
    }
    fetchTrailers = (queryParams?: AxiosRequestConfig) => {
        return axiosInstance.get<ResponseSchema<T>>(this.path, {...queryParams}).then(res => res.data.results);
    }
}