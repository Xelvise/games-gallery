import { Grid, GridItem, Heading, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import { NavigationSchema } from './components/Navigation';
import Navigation from "./components/Navigation";

export interface GameQuerySchema {
    page: string|null;
    genreId: number|null;
    platformId: number|null;
    sortOrder: string|null;
    searchString: string|null;
}

export default function App() {
    const [gameQuery, setGameQuery] = useState<GameQuerySchema>({page: null, genreId: null, platformId: null, sortOrder: null, searchString: null});
    const [navURLParams, setNavURLParams] = useState<NavigationSchema>({} as NavigationSchema);

    // At first, gameQuery is initialized to an empty GameQuery object
    // Hence, gameQuery is an object of state variables which gets updated by the user's actions

    // For the following callbacks, gameQuery object is spread into its individual properties, appending an updated state variable
    const onNavigate = (pageNo: string|null) => {
        setGameQuery({...gameQuery, page: pageNo});
    }
    const onSelectGenre = (genreId: number|null) => {
        setGameQuery({...gameQuery, genreId: genreId});//, page: '1'});
    }
    const onSelectPlatform = (platformId: number|null) => {
        setGameQuery({...gameQuery, platformId: platformId});//, page: '1'});
    }
    const onSort = (sortBy: string|null) => {
        setGameQuery({...gameQuery, sortOrder: sortBy});
    }
    const onSearch = (query: string|null) => {
        setGameQuery({...gameQuery, searchString: query, genreId: null, platformId: null});//, page: '1'});
    }

    const saveNavParams = (navParam: NavigationSchema) => {
        // comparing the new navigation parameters with the current state before updating the state.
        if (navParam.previous !== navURLParams.previous || navParam.next !== navURLParams.next)
            setNavURLParams(navParam);
    };
    
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
            <GridItem area='lhs' paddingX={5} paddingTop={4}>
                <Heading size={'md'} marginBottom={4}>Genres</Heading>
                <GenreList onSelectGenre={onSelectGenre} selectedGenreId={gameQuery.genreId}/>
            </GridItem>
        </Show>
        <GridItem area='main'>
            <GameHeading gameState={gameQuery}/>
            <HStack justifyContent={'space-between'} paddingRight={5}>
                <HStack spacing={3} paddingLeft={3}>
                    <PlatformSelector onSelectPlatform={onSelectPlatform} selectedPlatformId={gameQuery.platformId}/>
                    <SortSelector onSort={onSort} selectedOrder={gameQuery.sortOrder}/>
                </HStack>
                <Navigation navURLParams={navURLParams} onNavigate={onNavigate}/>
            </HStack>
            <GameGrid gameQuery={gameQuery} />
        </GridItem>
    </Grid>
    );
};