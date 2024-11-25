import { useEffect, useState } from "react";
import server from '../services/api-client'
import { CanceledError } from "axios";

interface FetchResponse<T> {
    count: number;
    results: T[];
}

export default function fetchData<T>(endpoint: string) {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoadingState] = useState(false);

    const controller = new AbortController();
    useEffect(() => {
        setLoadingState(true)
        server.get<FetchResponse<T>>(endpoint, {signal: controller.signal})    //The type annotation lets us know the data structure of the 'response' obj
            .then(res => setData(res.data.results))
            .catch(err => {
                if (err instanceof CanceledError) return;
                setError(err.message)
            })
            .finally(() => setLoadingState(false));
        return () => controller.abort()    // a clean-up function
    }, []);

    return {data, error, isLoading}
}