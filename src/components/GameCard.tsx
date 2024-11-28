import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Game } from "../hooks/fetchGames"
import PlatformIconTray from "./PlatformIconTray";
import CriticScore from "./CriticScore";
import placeholder from '../assets/placeholder.webp'

interface Props {
    game: Game;
}

export default function GameCard({game}: Props) {
    let croppedImgURL = ''
    if (!game.background_image) croppedImgURL = placeholder
    else if (game.background_image.includes('games')) {
        const splittedURL = game.background_image.split('games')
        croppedImgURL = splittedURL[0] + 'crop/600/400/games' + splittedURL[1]
        
    } else if (game.background_image.includes('screenshots')) {
        const splittedURL = game.background_image.split('screenshots')
        croppedImgURL = splittedURL[0] + 'crop/600/400/screenshots' + splittedURL[1]
    }

    return (
    <Card borderRadius={10} overflow='hidden'>
        <Image src={croppedImgURL}/>
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
