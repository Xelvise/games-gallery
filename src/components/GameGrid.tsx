import { SimpleGrid, Text } from '@chakra-ui/react';
import fetchGames, { Game } from '../hooks/fetchGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';

interface Props {
    selectedGenre: string | null;
    selectedPlatform: number | null;
    selectedSort: string | null;
}

export default function GameGrid({ selectedGenre, selectedPlatform, selectedSort }: Props) {
    const {data, error, isLoading} = fetchGames(selectedGenre, selectedPlatform, selectedSort);

    return (
        <div>
            {isLoading && 
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3} padding={5}>
                {data.map((_, index) =>
                    <GameCardSkeleton key={index} />
                )}
            </SimpleGrid>}
            
            {data.length === 0 && <Text fontSize={'3xl'}>No games found</Text>}

            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3} padding={5}>
                {data.map(game =>
                    <GameCard key={game.id} game={game} />
                )}
            </SimpleGrid>
        </div>
    );
}
