import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

export default function App() {

    return (
        <Grid templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav nav" "lhs main"`
        }}>
            <GridItem area='nav'>
                <NavBar/>
            </GridItem>
            <Show above="lg">
                <GridItem area='lhs'></GridItem>
            </Show>
            <GridItem area='main'></GridItem>
        </Grid>
    );
}