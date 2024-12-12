import { HStack, Image, List, ListItem, Spinner, Button } from '@chakra-ui/react'
import fetchGenres from '../fetch-hooks/fetchGenres'
import useGlobalStateStore from '../state-store';

export default function GenreList() {
    const { data: response, isLoading, error } = fetchGenres();

    const setGenreId = useGlobalStateStore(store => store.setGenreId);
    const selectedGenreId = useGlobalStateStore(store => store.gameQuery.genreId);

    if (isLoading) return <Spinner/>
    if (error) {
        console.log(error.message); 
        return null
    }
    const genres = response.results;

  return (
    <List>
        {genres.map( genre => {
            const splittedURL = genre.image_background.split('games');
            const croppedImgURL = splittedURL[1] ? splittedURL[0] + 'crop/600/400/games' + splittedURL[1] : genre.image_background;

            return (
            <ListItem key={genre.id} paddingY={'10px'}>
                <HStack>
                    <Image src={croppedImgURL} objectFit={'cover'} boxSize={'32px'} borderRadius={8} marginRight={2}/>
                    <Button 
                        fontWeight={genre.id === selectedGenreId ? 'extrabold' : 'normal'} 
                        onClick={() => selectedGenreId !== genre.id && setGenreId(genre.id)} 
                        variant={'link'}
                        fontSize={'md'}
                    >
                        {genre.name}
                    </Button>
                </HStack>
            </ListItem>
            );
        })}
    </List>
  )
}
