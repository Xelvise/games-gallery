import { useQuery as fetchHook } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { ResponseSchema } from '../schemas';
import platforms from '../local-data/platforms'
import { Platform } from "../schemas";

const APIclient = new APIClient<Platform>('/platforms')

export default function fetchPlatforms() {
    const { data, isLoading, error } = fetchHook<ResponseSchema<Platform>, Error>({
        queryKey: ['platforms'],
        queryFn: APIclient.fetchData,
        staleTime: 1 * 60 * 60 * 1000,    // 1 hour
        initialData: {count: platforms.results.length, next: null, previous: null, results: platforms.results}
        
    // Until after 1hr, no background refetch is done and the PlatformSelector component is served data directly from cache.
    // However, once it exceeds 15 mins, the query becomes stale. 
    // And if same query is made again, while the component still renders cached data, a background refetch is done to update the cache.
    // (i.e, on conditions that component is mounted, window is focused or network is reconnected)
    // Once the cache is updated, the component is re-rendered with the new data.
    });

    return { data, isLoading, error };
}