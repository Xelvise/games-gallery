import { Button, Menu, MenuButton, MenuList, MenuItem, Spinner } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import fetchPlatforms from '../fetch-hooks/fetchPlatforms'

interface Props {
    onSelectPlatform: (platformId: number|null) => void;
    selectedPlatformId: number|null;
    onSelectCallback: {
        platformName: string;
        Fn: (name: string) => void};
};

export default function PlatformSelector({onSelectPlatform, selectedPlatformId, onSelectCallback:{platformName, Fn}}: Props) {
    const { data: response, error } = fetchPlatforms();
    if (error) {
        console.log(error.message); 
        return null
    };
    const platforms = response?.results;
    const newPlatforms = [{id: null, name: 'All Platforms', slug: 'all-platforms'}, ...platforms]

  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>}>{platformName}</MenuButton>
        <MenuList>
            {newPlatforms.map(platform =>
                <MenuItem 
                    key={platform.id} 
                    onClick={() => {
                        Fn(platform.name);
                        // If platform hasn't already been selected
                        selectedPlatformId !== platform.id && onSelectPlatform(platform.id)}
                    }
                >
                    {platform.name}
                </MenuItem>
            )}
        </MenuList>
    </Menu>
  )
}
