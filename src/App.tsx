import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";

export default function App() {
    const [selectedGenre, setSelectedGenre] = useState<string|null>(null)
    const [selectedPlatform, setSelectedPlatform] = useState<number|null>(null)
    const [selectedSort, setSelectedSort] = useState<string|null>(null)
    const [searchQuery, setSearchQuery] = useState<string|null>(null)

    const onSelectGenre = (genreName: string) => {
        setSelectedGenre(genreName);
    }
    const onSelectPlatform = (id: number|null) => {
        setSelectedPlatform(id);
    }
    const onSort = (sortBy: string|null) => {
        setSelectedSort(sortBy);
    }
    const onSearch = (query: string) => {
        setSearchQuery(query);
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
                <GenreList onSelectGenre={onSelectGenre} selectedGenre={selectedGenre}/>
            </GridItem>
        </Show>
        <GridItem area='main'>
            <HStack spacing={3} marginBottom={3} paddingLeft={3}>
                <PlatformSelector onSelectPlatform={onSelectPlatform}/>
                <SortSelector onSort={onSort}/>
            </HStack>
            <GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} selectedSort={selectedSort} searchQuery={searchQuery}/>
        </GridItem>
    </Grid>
    );
}