import { SimpleGrid, Text } from '@chakra-ui/react';
import fetchGames from '../hooks/fetchGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardContainer from './GameCardContainer';

export default function GameGrid() {
    // Fetch array of games from server upon every reload and an error msg, if any is encountered
    const {data, error, isLoading} = fetchGames()
    const skeletons = [1,2,3,4,5,6]

    return (
    <div>
        {isLoading && skeletons.map(skeleton => 
            <GameCardContainer>
                <GameCardSkeleton key={skeleton}/>
            </GameCardContainer>
        )}
        {error && <Text color='red'>{error}</Text>}
        <SimpleGrid columns={{sm:2, md:3, lg:4, xl:5}} spacing={5} padding={5}>
            {data.map( game =>
                <GameCardContainer>
                    <GameCard key={game.id} game={game}/>
                </GameCardContainer>
            )}
        </SimpleGrid>
    </div>
    )
}
