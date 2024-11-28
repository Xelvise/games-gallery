import { GameQuery } from "../App";
import fetchData from "./fetchData";

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
}

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export default function fetchGames(gameQuery: GameQuery) {
    return fetchData<Game>(
        '/games', 
        { params: { genres: gameQuery.genre, platforms: gameQuery.platformId, ordering: gameQuery.sortOrder, search: gameQuery.searchString } }, 
        [gameQuery]
    )
}
