import { useParams } from "react-router-dom"
import fetchGameDetails from "../fetch-hooks/fetchGameDetails"
import { GridItem, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import TrailerViewer from "../components/TrailerViewer";
import ScreenshotViewer from "../components/ScreenshotViewer";

export default function GameOverviewPage() {
    const { slug } = useParams();
    const { data: game, error, isLoading } = fetchGameDetails(slug!);

    if (isLoading) return <Spinner />
    if (error || !game) return <p>{error.message}</p>
    return (
        <SimpleGrid column={{base: 1, md: 2}} spacing={5}>
            <GridItem>
                <Heading paddingBottom={4}>{game.name}</Heading>
                <ExpandableText>{game.description_raw}</ExpandableText>
                <GameAttributes game={game}/>
            </GridItem>
            <GridItem>
                <TrailerViewer gameId={game.id} />
                <ScreenshotViewer gameId={game.id} />
            </GridItem>
        </SimpleGrid>
    )
}
