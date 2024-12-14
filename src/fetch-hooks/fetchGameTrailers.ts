import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { GameTrailer } from "../schemas";

export default function fetchGameTrailers(gameId:string|number) {
    const APIclient = new APIClient<GameTrailer>(`/games/${gameId}/movies`);

    return useQuery<GameTrailer[], Error>({
        queryKey: ['trailers', gameId],
        queryFn: APIclient.fetchArrayOfItems,
        staleTime: 5 * 60 * 1000,    // 5 mins
    });
};