import { Heading } from "@chakra-ui/react";
import { GameQuerySchema } from "../App";

interface Props {
    gameState: GameQuerySchema
}

export default function GameHeading({gameState}: Props) {
    let heading = `${gameState.platform?.name || ''} ${gameState.genre?.name || ''} Games`
    heading = heading.includes('All Platforms') ? heading.split('All Platforms')[1].trim() : heading

    return <Heading as='h1' marginBottom={2} paddingLeft={3}>{heading}</Heading>
}