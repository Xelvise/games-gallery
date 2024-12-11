import { Heading } from "@chakra-ui/react";
import fetchGenres from "../fetch-hooks/fetchGenres";
import fetchPlatforms from "../fetch-hooks/fetchPlatforms";
import useGlobalStateStore from "../state-store";

export default function GameHeading() {
    const { data: genres } = fetchGenres();
    const { data: platforms } = fetchPlatforms();

    const selectedGenreId = useGlobalStateStore(store => store.gameQuery.genreId);
    const genre = genres?.results.find(genre => genre.id === selectedGenreId);

    const selectedPlatformId = useGlobalStateStore(s => s.gameQuery.platformId);
    const platform = platforms?.results.find(platform => platform.id === selectedPlatformId);

    let heading = `${platform?.name || ''} ${genre?.name || ''} Games`
    heading = heading.includes('All Platforms') ? heading.split('All Platforms')[1].trim() : heading

    return <Heading as='h1' marginBottom={2} paddingLeft={3}>{heading}</Heading>
}