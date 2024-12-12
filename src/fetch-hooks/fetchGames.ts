import { useInfiniteQuery as InfiniteFetchHook } from "@tanstack/react-query";
import APIClient, { ResponseSchema } from "../services/api-client";
import { GameQuerySchema } from "../state-store";
import { Game } from "../Interfaces";

const APIclient = new APIClient<Game>('/games')
export default function fetchGames(gameQuery: GameQuerySchema) {
    return InfiniteFetchHook<ResponseSchema<Game>, Error>({
        queryKey: Object.keys(gameQuery).length !== 0 
            ? ['games', {...gameQuery}]
            : ['games'],

        queryFn: ({pageParam = 1}) => APIclient.fetchData({
            params: { page: pageParam, genres: gameQuery.genreId, platforms: gameQuery.platformId, ordering: gameQuery.sortOrder, search: gameQuery.searchText }
        }),

        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length+1 : undefined
        },

        staleTime: 30 * 60 * 1000,    // 30 mins
        
    // Until after 15 mins, no background refetch is done and the GameGrid component is served data directly from cache.
    // However, once it exceeds 15 mins, the query becomes stale. 
    // And if same query is made again, while the component still renders cached data, a background refetch is done to update the cache.
    // (i.e, on conditions that component is mounted, window is focused or network is reconnected)
    // Once the cache is updated, the component is re-rendered with the new data.
    });
};
