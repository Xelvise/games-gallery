import { Button, Menu, MenuButton, MenuList, MenuItem, Spinner } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import fetchPlatforms from '../fetch-hooks/fetchPlatforms'
import useGlobalStateStore from '../state-store';

export default function PlatformSelector() {
    const { data: response, error } = fetchPlatforms();
    if (error) {
        console.log(error.message); 
        return null
    };
    const platforms = response?.results;
    const allPlatforms = [{id: null, name: 'All Platforms', slug: 'all-platforms'}, ...platforms];

    const updatePlatformName = useGlobalStateStore(store => store.updatePlatformName);
    const platformName = useGlobalStateStore(store => store.platformName);
    const setPlatformId = useGlobalStateStore(store => store.setPlatformId);
    const selectedPlatformId = useGlobalStateStore(store => store.gameQuery.platformId);

  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>}>{platformName}</MenuButton>
        <MenuList>
            {allPlatforms.map(platform =>
                <MenuItem 
                    key={platform.id} 
                    onClick={() => {
                        updatePlatformName(platform.name);
                        // If platform hasn't already been selected
                        selectedPlatformId !== platform.id && setPlatformId(platform.id)}
                    }
                >
                    {platform.name}
                </MenuItem>
            )}
        </MenuList>
    </Menu>
  )
}
