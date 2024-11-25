import fetchData from "./fetchData";

interface GenreObject {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export default function fetchGenres() {
    return fetchData<GenreObject>('/genres')
}