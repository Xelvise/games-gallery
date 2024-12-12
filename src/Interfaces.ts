export interface Game {
    id: number;
    name: string;
    slug: string;
    genres: Genre[];
    description_raw: string;
    background_image: string;
    parent_platforms: { platform: Platform; }[];
    metacritic: number;
    publishers: Publisher[];
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface Platform {
    id: number | null;
    name: string;
    slug: string;
}

interface Publisher {
    id: number;
    name: string;
}

