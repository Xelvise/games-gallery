import { useParams } from "react-router-dom"
import fetchGameDetails from "../fetch-hooks/fetchGameDetails"
import { Heading, Spinner, Text } from "@chakra-ui/react";

export default function GameDetailsPage() {
    const { slug } = useParams();
    const { data: game, error, isLoading } = fetchGameDetails(slug!);

    if (isLoading) return <Spinner />
    if (error || !game) return <p>{error.message}</p>

    return (
    <>
        <Heading paddingBottom={4}>{game.name}</Heading>
        <Text>{game.description_raw}</Text>
    </>
    )
}
