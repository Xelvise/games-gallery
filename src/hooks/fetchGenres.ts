import fetchData from "./fetchData";

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export default function fetchGenres() {
    return fetchData<Genre>('/genres')
}