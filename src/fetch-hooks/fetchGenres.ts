import { useQuery as fetchHook } from "@tanstack/react-query";
import APIClient, { ResponseSchema } from "../services/api-client";
import genres from '../data/genres'


export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

const APIclient = new APIClient<Genre>('/genres')

export default function fetchGenres() {
    const { data, isLoading, error } = fetchHook<ResponseSchema<Genre>, Error>({
        queryKey: ['genres'],
        queryFn: APIclient.fetchData,
        staleTime: 1 * 60 * 60 * 1000,    // 1 hour
        initialData: {count: genres.results.length, next: null, previous: null, results: genres.results}
        
    // Until after 1hr, no background refetch is done and the Genre component is served data directly from cache.
    // However, once it exceeds 1hr, the query becomes stale. 
    // And if same query is made again, while the component still renders cached data, a background refetch is done to update the cache.
    // (i.e, on conditions that component is mounted, window is focused or network is reconnected)
    // Once the cache is updated, the component is re-rendered with the new data.
    });

    return { data, isLoading, error };
}