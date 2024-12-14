import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Screenshot } from "../schemas";

export default function fetchGameScreenshots(game_pk: string|number) {
    const APIclient = new APIClient<Screenshot>(`/games/${game_pk}/screenshots`);

    return useQuery<Screenshot[], Error>({
        queryKey: ['screenshots', game_pk],
        queryFn: APIclient.fetchArrayOfItems,
        staleTime: 5 * 60 * 1000,   // 5 mins
    })
}
