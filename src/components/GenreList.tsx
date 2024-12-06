import { HStack, Image, List, ListItem, Spinner, Button } from '@chakra-ui/react'
import fetchGenres, { Genre } from '../fetch-hooks/fetchGenres'

interface Props {
    onSelectGenre: (genre: number) => void;
    selectedGenreId: number|null;
}

export default function GenreList({onSelectGenre, selectedGenreId}: Props) {
    const { data: response, isLoading, error } = fetchGenres();
    if (isLoading) return <Spinner/>
    if (error) {
        console.log(error.message); 
        return null
    }
    const genres = response?.results;

  return (
    <List>
        {genres?.map( genre => {
            const splittedURL = genre.image_background.split('games');
            const croppedImgURL = splittedURL[1] ? splittedURL[0] + 'crop/600/400/games' + splittedURL[1] : genre.image_background;

            return (
            <ListItem key={genre.id} paddingY={'10px'}>
                <HStack>
                    <Image src={croppedImgURL} objectFit={'cover'} boxSize={'32px'} borderRadius={8} marginRight={2}/>
                    <Button 
                        fontWeight={genre.id === selectedGenreId ? 'extrabold' : 'normal'} 
                        onClick={() => selectedGenreId !== genre.id && onSelectGenre(genre.id)} 
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
