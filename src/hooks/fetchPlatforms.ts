import fetchData from "./fetchData";

interface Platform {
    id: number;
    name: string;
    slug: string;
    
}

export default function fetchPlatforms() {
    return fetchData<Platform>('/platforms/lists/parents')
}