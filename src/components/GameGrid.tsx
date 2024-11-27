import { SimpleGrid, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import fetchGames, { Game } from '../hooks/fetchGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';

interface Props {
    selectedGenre: string | null;
}

export default function GameGrid({ selectedGenre }: Props) {
    const {data, error, isLoading} = fetchGames(selectedGenre);

    return (
        <div>
            {isLoading && 
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3} padding={5}>
                {data.map((_, index) =>
                    <GameCardSkeleton key={index} />
                )}
            </SimpleGrid>}

            {error && <Text color='red'>{error}</Text>}

            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={3} padding={5}>
                {data.map(game =>
                    <GameCard key={game.id} game={game} />
                )}
            </SimpleGrid>
        </div>
    );
}
