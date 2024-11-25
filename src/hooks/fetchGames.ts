import fetchData from "./fetchData";

export interface GameObject {
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

export default function fetchGames() {
    return fetchData<GameObject>('/games')
}
