import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import fetchGames, { Game } from '../fetch-hooks/fetchGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import { GameQuerySchema } from '../App';

interface Props {
    gameQuery: GameQuerySchema;
    saveNavParams: (navigation: NavigationSchema) => void;
}

export interface NavigationSchema {
    previous: string|null;
    next: string|null;
}

export default function GameGrid({ gameQuery, saveNavParams }: Props) {
    const {data, error, isLoading} = fetchGames(gameQuery);
    if (error) return <Text>{error.message}</Text>
    const games = data?.results
    saveNavParams({previous: data?.previous ?? null, next: data?.next ?? null});

    return (
        <Box>
            {isLoading && 
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6} padding={5}>
                {games?.map((_, index) =>
                    <GameCardSkeleton key={index} />
                )}
            </SimpleGrid>}
            
            {!isLoading && games?.length === 0 && <Text fontSize={'3xl'} paddingLeft={700} paddingRight={700} whiteSpace={'nowrap'}>No games found</Text>}

            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6} padding={5}>
                {games?.map(game =>
                    <GameCard key={game.id} game={game} />
                )}
            </SimpleGrid>
        </Box>
    );
}
