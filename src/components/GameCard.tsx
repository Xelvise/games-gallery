import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Game } from "../fetch-hooks/fetchGames"
import PlatformIconTray from "./PlatformIconTray";
import CriticScore from "./CriticScore";
import placeholder from '../assets/placeholder.webp'
import { Link } from "react-router-dom";

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
    <Card borderRadius={10} overflow='hidden' _hover={{transform: 'scale(1.03)', transition: 'transform .15s ease-in'}}>
        <Image src={croppedImgURL}/>
        <CardBody>
            
            <HStack justifyContent={"space-between"} marginBottom={2}>
                <HStack>
                    {game.parent_platforms
                        ? game.parent_platforms.map(({platform}) =>
                            <PlatformIconTray key={platform.id} platform={platform}/>)
                        : null
                    }
                </HStack>
                <CriticScore score={game.metacritic}/>
            </HStack>

            <Link to={`/games/${game.slug}`}>
                <Heading fontSize='xl'>{game.name}</Heading>
            </Link>

        </CardBody>
    </Card>
    )
}
