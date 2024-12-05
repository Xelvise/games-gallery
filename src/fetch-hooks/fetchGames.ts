import { GameQuerySchema } from "../App";
import { useQuery as fetchHook } from "@tanstack/react-query";
import APIClient, { ResponseSchema } from "../services/api-client";
import { Platform } from "./fetchPlatforms";

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
}

const APIclient = new APIClient<Game>('/games')

export default function fetchGames(gameQuery: GameQuerySchema) {
    const { data, isLoading, error } = fetchHook<ResponseSchema<Game>, Error>({
        queryKey: Object.keys(gameQuery).length !== 0 
            ? ['games', {...gameQuery, genre: gameQuery.genre?.slug, platform: gameQuery.platform?.slug}]
            : ['games'],
        queryFn: () => APIclient.fetchData({
            params: { page: gameQuery.page, genres: gameQuery.genre?.slug, platforms: gameQuery.platform?.id, ordering: gameQuery.sortOrder, search: gameQuery.searchString }
        }),
        staleTime: 15 * 60 * 1000,    // 15 mins
        
    // Until after 15 mins, no background refetch is done and the GameGrid component is served data directly from cache.
    // However, once it exceeds 15 mins, the query becomes stale. 
    // And if same query is made again, while the component still renders cached data, a background refetch is done to update the cache.
    // (i.e, on conditions that component is mounted, window is focused or network is reconnected)
    // Once the cache is updated, the component is re-rendered with the new data.
    });

    return { data, isLoading, error };
};
