import { Heading } from "@chakra-ui/react";
import { GameQuerySchema } from "../App";
import fetchGenres from "../fetch-hooks/fetchGenres";
import fetchPlatforms from "../fetch-hooks/fetchPlatforms";

interface Props {
    gameState: GameQuerySchema
}

export default function GameHeading({gameState}: Props) {
    const { data: genres } = fetchGenres();
    const { data: platforms } = fetchPlatforms();
    const genre = genres?.results.find(genre => genre.id === gameState.genreId);
    const platform = platforms?.results.find(platform => platform.id === gameState.platformId);

    let heading = `${platform?.name || ''} ${genre?.name || ''} Games`
    heading = heading.includes('All Platforms') ? heading.split('All Platforms')[1].trim() : heading

    return <Heading as='h1' marginBottom={2} paddingLeft={3}>{heading}</Heading>
}