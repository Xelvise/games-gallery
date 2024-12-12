import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Game } from "./fetchGames";

const APIclient = new APIClient<Game>('/games');
export default function fetchGameDetails(gameId:string) {
    return useQuery<Game, Error>({
        queryKey: ['game', gameId],
        queryFn: () => APIclient.fetchDetailsByID(gameId),
        staleTime: 5 * 60 * 1000,    // 30 mins
    });
};