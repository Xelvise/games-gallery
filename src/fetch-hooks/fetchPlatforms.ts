import platforms from '../data/platforms'

export default function fetchPlatforms() {
    return {data: platforms.results, isLoading: false, error: null}
}