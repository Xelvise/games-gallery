import { Grid, GridItem, Heading, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import { Genre } from "./fetch-hooks/fetchGenres";
import { Platform } from "./fetch-hooks/fetchGames";
import GameHeading from "./components/GameHeading";
import { NavigationSchema } from "./fetch-hooks/fetchData";
import Navigation from "./components/Navigation";

export interface GameQuerySchema {
    page: string|null;
    genre: Genre|null;
    platform: Platform|null;
    sortOrder: string|null;
    searchString: string|null;
}

export default function App() {
    const [gameQuery, setGameQuery] = useState<GameQuerySchema>({} as GameQuerySchema);
    const [navURLParams, setNavURLParams] = useState<NavigationSchema>({} as NavigationSchema);

    // At first, gameQuery is initialized to a GameQuery object where each property (genre, platform, sortOrder, searchString) is set to null
    // Hence, gameQuery is an object of state variables which gets updated by the user's actions

    // For the following callbacks, gameQuery object is spread into its individual properties, appending an updated state variable
    const onNavigate = (pageNo: string|null) => {
        setGameQuery({...gameQuery, page: pageNo});
    }
    const onSelectGenre = (genreName: Genre) => {
        setGameQuery({...gameQuery, genre: genreName});
    }
    const onSelectPlatform = (platform: Platform|null) => {
        setGameQuery({...gameQuery, platform: platform});
    }
    const onSort = (sortBy: string|null) => {
        setGameQuery({...gameQuery, sortOrder: sortBy});
    }
    const onSearch = (query: string|null) => {
        setGameQuery({...gameQuery, searchString: query});
    }
    
    return (
    // base represents a mobile device rendering a NavBar and Main section
    // lg represents a PC rendering a Navbar and Main section, where main is further splitted into two columns
    <Grid templateAreas={{
        base: '"nav" "main"', lg: '"nav nav" "lhs main"'
    }} templateColumns={{
        base: '1fr', lg: '250px 1fr'
    }}>
        <GridItem area='nav'>
            <NavBar onSearch={onSearch} searchString={gameQuery.searchString}/>
        </GridItem>
        <Show above="lg">
            <GridItem area='lhs' paddingX={5}>
                <GenreList onSelectGenre={onSelectGenre} selectedGenre={gameQuery.genre}/>
            </GridItem>
        </Show>
        <GridItem area='main'>
            <GameHeading gameState={gameQuery}/>
            <HStack justifyContent={'space-between'} paddingRight={5}>
                <HStack spacing={3} paddingLeft={3}>
                    <PlatformSelector onSelectPlatform={onSelectPlatform} selectedPlatform={gameQuery.platform}/>
                    <SortSelector onSort={onSort} selectedOrder={gameQuery.sortOrder}/>
                </HStack>
                <Navigation navURLParams={navURLParams} onNavigate={onNavigate}/>
            </HStack>
            <GameGrid gameQuery={gameQuery} saveNavParams={navParam => setNavURLParams(navParam)}/>
        </GridItem>
    </Grid>
    );
}