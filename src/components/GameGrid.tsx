import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import fetchGames, { Game } from '../hooks/fetchGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import { GameQuery } from '../App';

interface Props {
    gameQuery: GameQuery;
}

export default function GameGrid({ gameQuery }: Props) {
    const {data, error, isLoading} = fetchGames(gameQuery);

    return (
        <Box>
            {isLoading && 
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3} padding={5}>
                {data.map((_, index) =>
                    <GameCardSkeleton key={index} />
                )}
            </SimpleGrid>}
            
            {data.length === 0 && <Text fontSize={'3xl'} paddingLeft={700} paddingRight={700} whiteSpace={'nowrap'}>No games found</Text>}

            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3} padding={5}>
                {data.map(game =>
                    <GameCard key={game.id} game={game} />
                )}
            </SimpleGrid>
        </Box>
    );
}
