import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";

export default function App() {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

    const onSelect = (genreName: string) => {
        setSelectedGenre(genreName);
    }
    return (
    // base - two rows with one column (2, 1)
    // lg: two rows, row 2 is splitted into two columns
    <Grid templateAreas={{
        base: '"nav" "main"',
        lg: '"nav nav" "lhs main"'
    }} templateColumns={{
        base: '1fr',
        lg: '250px 1fr'
    }}>
        <GridItem area='nav'>
            <NavBar/>
        </GridItem>
        <Show above="lg">
            <GridItem area='lhs' paddingX={5}>
                <GenreList onSelectGenre={onSelect} selectedGenre={selectedGenre}/>
            </GridItem>
        </Show>
        <GridItem area='main'>
            <GameGrid selectedGenre={selectedGenre}/>
        </GridItem>
    </Grid>
    );
}