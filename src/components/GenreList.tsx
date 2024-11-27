import { HStack, Image, List, ListItem, Spinner, Button } from '@chakra-ui/react'
import fetchGenres from '../hooks/fetchGenres'

interface Props {
    onSelectGenre: (genreName: string) => void;
    selectedGenre: string | null;
}

export default function GenreList({onSelectGenre, selectedGenre}: Props) {
    const {data, isLoading, error} = fetchGenres();
    if (isLoading) return <Spinner/>
    if (error) return null

  return (
    <List>
        {data.map( genre => {
            const splittedURL = genre.image_background.split('games');
            const croppedImgURL = splittedURL[1] ? splittedURL[0] + 'crop/600/400/games' + splittedURL[1] : genre.image_background;

            return (
            <ListItem key={genre.id} paddingY={'10px'}>
                <HStack>
                    <Image src={croppedImgURL} boxSize={'32px'} borderRadius={8} marginRight={2}/>
                    <Button fontWeight={genre.slug === selectedGenre ? 'extrabold' : 'normal'} onClick={() => onSelectGenre(genre.slug)} variant={'link'} fontSize={'md'}>{genre.name}</Button>
                </HStack>
            </ListItem>
            );
        })}
    </List>
  )
}
