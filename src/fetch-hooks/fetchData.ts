import { useEffect, useState } from "react";
import serverURL from '../services/api-client'
import { AxiosRequestConfig, CanceledError } from "axios";

interface ResponseSchema<T> {
    count: number;
    next: string|null;
    previous: string|null;
    results: T[];
}

export interface NavigationSchema {
    previous: string|null;
    next: string|null;
}

export default function fetchData<T>(endpoint: string, queryParam?: AxiosRequestConfig, deps?: any[]) {
    const [data, setData] = useState<T[]>([]);
    const [navParams, setNavParams] = useState<NavigationSchema>({} as NavigationSchema);
    const [error, setError] = useState('');
    const [isLoading, setLoadingState] = useState(false);

    const controller = new AbortController();
    useEffect(() => {
        setLoadingState(true)
        serverURL.get<ResponseSchema<T>>(endpoint, {...queryParam, signal: controller.signal})    //The type annotation lets us know the data structure of the 'response' obj
            .then(({data}) => {
                setData(data.results);
                setNavParams({previous: data.previous, next: data.next});
            })
            .catch(err => {
                if (!(err instanceof CanceledError)) {
                    console.log(err);
                    setError(err.message);
                }
            })
            .finally(() => setLoadingState(false));
        return () => controller.abort()    // a clean-up function
    }, deps ? [...deps]:[]);

    return {data, navParams, error, isLoading}
}