import genreData from '../data/genres'

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export default function fetchGenres() {
    return {data: genreData.results, isLoading: false, error: null}
}