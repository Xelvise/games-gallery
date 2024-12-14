import { SimpleGrid, Text } from "@chakra-ui/react";
import { Game } from "../schemas";
import CriticScore from "./CriticScore";
import ItemDefinition from "./ItemDefinition";

interface Props {
    game: Game;
}

export default function GameAttributes({ game }: Props) {
    return (
        <SimpleGrid columns={2} as="dl">
            <ItemDefinition term="Platforms">
                {game.parent_platforms.map(({platform}) =>
                    <Text key={platform.id}>{platform.name}</Text>
                )}
            </ItemDefinition>
            <ItemDefinition term="Metascore">
                {game.metacritic ? <CriticScore score={game.metacritic}/> : <Text>Unknown</Text>}
            </ItemDefinition>
            <ItemDefinition term="Genres">
                {game.genres.length === 0 && <Text>Unknown</Text>}
                {game.genres.map(genre =>
                    <Text key={genre.id}>{genre.name}</Text>
                )}
            </ItemDefinition>
            <ItemDefinition term="Publishers">
                {game.publishers.length === 0 && <Text>Unknown</Text>}
                {game.publishers.map(publisher =>
                    <Text key={publisher.id}>{publisher.name}</Text>
                )}
            </ItemDefinition>
        </SimpleGrid>
    )
}
