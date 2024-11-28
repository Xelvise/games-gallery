import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";

export interface GameQuery {
    genre: string|null;
    platformId: number|null;
    sortOrder: string|null;
    searchString: string|null
}

export default function App() {
    const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

    const onSelectGenre = (genreName: string) => {
        setGameQuery({...gameQuery, genre: genreName});
    }
    const onSelectPlatform = (id: number|null) => {
        setGameQuery({...gameQuery, platformId: id});
    }
    const onSort = (sortBy: string|null) => {
        setGameQuery({...gameQuery, sortOrder: sortBy});
    }
    const onSearch = (query: string|null) => {
        setGameQuery({...gameQuery, searchString: query});
    }
    
    return (
    // base: two rows with one column
    // lg: two rows, with row-2 splitted into two columns
    <Grid templateAreas={{
        base: '"nav" "main"', lg: '"nav nav" "lhs main"'
    }} templateColumns={{
        base: '1fr', lg: '250px 1fr'
    }}>
        <GridItem area='nav'>
            <NavBar onSearch={onSearch}/>
        </GridItem>
        <Show above="lg">
            <GridItem area='lhs' paddingX={5}>
                <GenreList onSelectGenre={onSelectGenre} selectedGenre={gameQuery.genre}/>
            </GridItem>
        </Show>
        <GridItem area='main'>
            <HStack spacing={3} marginBottom={3} paddingLeft={3}>
                <PlatformSelector onSelectPlatform={onSelectPlatform}/>
                <SortSelector onSort={onSort}/>
            </HStack>
            <GameGrid gameQuery={gameQuery}/>
        </GridItem>
    </Grid>
    );
}