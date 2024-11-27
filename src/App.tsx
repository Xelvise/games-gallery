import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";

export default function App() {
    const [selectedGenre, setSelectedGenre] = useState<string|null>(null)
    const [selectedPlatform, setSelectedPlatform] = useState<number|null>(null)

    const onSelectGenre = (genreName: string) => {
        setSelectedGenre(genreName);
    }
    const onSelectPlatform = (id: number) => {
        setSelectedPlatform(id);
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
            <NavBar/>
        </GridItem>
        <Show above="lg">
            <GridItem area='lhs' paddingX={5}>
                <GenreList onSelectGenre={onSelectGenre} selectedGenre={selectedGenre}/>
            </GridItem>
        </Show>
        <GridItem area='main'>
            <PlatformSelector onSelectPlatform={onSelectPlatform}/>
            <GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform}/>
        </GridItem>
    </Grid>
    );
}