import { Box, Button, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import fetchGames, { Game } from '../fetch-hooks/fetchGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import { GameQuerySchema } from '../App';
import { Fragment } from "react";
import { NavigationSchema } from './Navigation';

interface Props {
    gameQuery: GameQuerySchema;
    saveNavParams?: (navigation: NavigationSchema) => void;
}

export default function GameGrid({ gameQuery }: Props) {
    const {data, error, isLoading, hasNextPage, fetchNextPage} = fetchGames(gameQuery);
    if (error) return <Text>{error.message}</Text>
    const gamePages = data?.pages

    const fetchedGamesCount = gamePages?.reduce((acc, page) => acc + page.results.length, 0) || 0;

    return (
        <Box>
            {isLoading &&
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6} padding={5}>
                {Array.from({ length:20 }).map((_, index) =>
                    <GameCardSkeleton key={index} />
                )}
            </SimpleGrid>}
            
            {gamePages && gamePages[0].results.length === 0 && 
            <Text fontSize={'3xl'} paddingLeft={700} paddingRight={700} whiteSpace={'nowrap'}>
                No games found
            </Text>}

            <InfiniteScroll
                dataLength={fetchedGamesCount}
                hasMore={!!hasNextPage}
                next={fetchNextPage}
                loader={<Spinner />}
            >
                <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6} padding={5}>
                    {gamePages?.map((page, index) =>
                        <Fragment key={index}>
                            {page.results.map(game =>
                                <GameCard key={game.id} game={game} />
                            )}
                        </Fragment>
                    )}
                </SimpleGrid>
            </InfiniteScroll>
        </Box>
    );
}
