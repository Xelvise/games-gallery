import { GameQuerySchema } from "../App";
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

export default function fetchGames(gameQuery: GameQuerySchema) {
    return fetchData<Game>(
        '/games', 
        { params: { page: gameQuery.page, genres: gameQuery.genre?.slug, platforms: gameQuery.platform?.id, ordering: gameQuery.sortOrder, search: gameQuery.searchString }}, 
        [gameQuery]
    )
}
