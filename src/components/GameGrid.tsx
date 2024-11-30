import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import fetchGames, { Game } from '../fetch-hooks/fetchGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import { GameQuerySchema } from '../App';
import { NavigationSchema } from '../fetch-hooks/fetchData';

interface Props {
    gameQuery: GameQuerySchema;
    saveNavParams: (navigation: NavigationSchema) => void;
}

export default function GameGrid({ gameQuery, saveNavParams }: Props) {
    const {data, navParams, error, isLoading} = fetchGames(gameQuery);
    if (error) return <Text>{error}</Text>
    saveNavParams(navParams);

    return (
        <Box>
            {isLoading && 
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6} padding={5}>
                {data.map((_, index) =>
                    <GameCardSkeleton key={index} />
                )}
            </SimpleGrid>}
            
            {!isLoading && data.length === 0 && <Text fontSize={'3xl'} paddingLeft={700} paddingRight={700} whiteSpace={'nowrap'}>No games found</Text>}

            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6} padding={5}>
                {data.map(game =>
                    <GameCard key={game.id} game={game} />
                )}
            </SimpleGrid>
        </Box>
    );
}
