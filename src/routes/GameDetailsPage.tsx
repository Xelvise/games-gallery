import { useParams } from "react-router-dom"
import fetchGameDetails from "../fetch-hooks/fetchGameDetails"
import { Button, Heading, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import ExpandableText from "../components/ExpandableText";

export default function GameDetailsPage() {
    const [isExpanded, setExpanded] = useState(false)
    const { slug } = useParams();
    const { data: game, error, isLoading } = fetchGameDetails(slug!);

    if (isLoading) return <Spinner />
    if (error || !game) return <p>{error.message}</p>

    return (
    <>
        <Heading paddingBottom={4}>{game.name}</Heading>
        <ExpandableText>{game.description_raw}</ExpandableText>
    </>
    )
}
