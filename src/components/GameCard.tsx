import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Game } from "../hooks/fetchGames"
import PlatformIconTray from "./PlatformIconTray";
import CriticScore from "./CriticScore";

interface Props {
    game: Game;
}

export default function GameCard({game}: Props) {
    const splittedURL = game.background_image.split('games')
    const croppedImgURL = splittedURL[0] + 'crop/600/400/games' + splittedURL[1]

    return (
    <Card borderRadius={10} overflow='hidden'>
        <Image src={croppedImgURL} alt={game.name}/>
        <CardBody>
            <Heading fontSize='xl'>{game.name}</Heading>

            <HStack justifyContent={"space-between"}>
                <HStack marginY={1}>
                    {game.parent_platforms.map(({platform}) =>
                        <PlatformIconTray key={platform.id} platform={platform}/>)}
                </HStack>

                <CriticScore score={game.metacritic}/>
            </HStack>

        </CardBody>
    </Card>
    )
}
