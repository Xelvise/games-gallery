import { Spinner } from "@chakra-ui/react";
import fetchGameTrailers from "../fetch-hooks/fetchGameTrailers";

interface Props {
    gameId: number|string;
}

export default function TrailerViewer({gameId}: Props) {
    const { data: trailers, error, isLoading } = fetchGameTrailers(gameId);

    if (isLoading) return <Spinner />;
    if (error || !trailers) return <p>{error.message}</p>
    const firstTrailer = trailers[0];

    return firstTrailer && <video src={firstTrailer.data[480]} poster={firstTrailer.preview} controls />
}
