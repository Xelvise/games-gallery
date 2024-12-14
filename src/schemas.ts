export interface ResponseSchema<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface Game {
    id: number;
    name: string;
    slug: string;
    genres: Genre[];
    description_raw: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
    publishers: Publisher[];
}

interface Publisher {
    id: number;
    name: string;
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

export interface GameTrailer {
    id: number;
    name: string;
    preview: string;
    data: {480: string, max: string}
}

export interface Screenshot {
    image: string;
    hidden: boolean
    width?: number;
    height?: number;
}