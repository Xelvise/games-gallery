import { Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import fetchGameScreenshots from "../fetch-hooks/fetchGameScreenshots";

interface Props {
    gameId: string|number;
}

export default function ScreenshotViewer({gameId}: Props) {
    const { data: screenshots, error, isLoading } = fetchGameScreenshots(gameId);
    if (isLoading) return <Spinner />;
    if (error || !screenshots) return <p>{error.message}</p>

    return (
        <SimpleGrid columns={{base: 1, md: 4}} spacing={5}>
            {screenshots.map((screenshot, index) => (
                <Image key={index} src={screenshot.image} borderRadius={10}/>
            ))}
        </SimpleGrid>
    )
}