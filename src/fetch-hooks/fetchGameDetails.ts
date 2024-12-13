import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Game } from "../Interfaces";

export default function fetchGameDetails(gameId:string) {
    const APIclient = new APIClient<Game>(`/games/${gameId}`);

    return useQuery<Game, Error>({
        queryKey: ['game', gameId],
        queryFn: APIclient.fetchDetail,
        staleTime: 5 * 60 * 1000,    // 5 mins
    });
};