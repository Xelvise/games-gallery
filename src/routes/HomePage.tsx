import { Grid, GridItem, Heading, HStack, Show } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

export default function HomePage() {
  return (
    <Grid templateAreas={{
        base: '"main"', lg: '"lhs main"'
    }} templateColumns={{
        base: '1fr', lg: '250px 1fr'
    }}>
        <Show above="lg">
            <GridItem area='lhs' paddingX={5} paddingTop={4}>
                <Heading size={'md'} marginBottom={4}>Genres</Heading>
                <GenreList/>
            </GridItem>
        </Show>
        <GridItem area='main'>
            <GameHeading/>
            <HStack justifyContent={'space-between'} paddingRight={5}>
                <HStack spacing={3} paddingLeft={3}>
                    <PlatformSelector/>
                    <SortSelector/>
                </HStack>
                {/* <Navigation navURLParams={navURLParams} onNavigate={onNavigate}/> */}
            </HStack>
            <GameGrid/>
        </GridItem>
    </Grid>
  )
}
