import fetchGameTrailers from "../fetch-hooks/fetchGameTrailers";
import { GameTrailer } from "../Interfaces";

interface Props {
    gameId: number|string;
}

export default function TrailerViewer({gameId}: Props) {
    const { data: trailers, error, isLoading } = fetchGameTrailers(gameId);

    if (isLoading) return null;
    if (error || !trailers) return <p>{error.message}</p>

    return <video src={trailers[0].data[480]} poster={trailers[0].preview} controls/>
}
