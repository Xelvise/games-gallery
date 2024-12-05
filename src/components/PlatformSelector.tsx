import { Button, Menu, MenuButton, MenuList, MenuItem, Spinner } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import fetchPlatforms from '../fetch-hooks/fetchPlatforms'
import { useState } from 'react';
import { Platform } from '../fetch-hooks/fetchPlatforms';

interface Props {
    onSelectPlatform: (platform: Platform|null) => void;
    selectedPlatform: Platform|null;
}

export default function PlatformSelector({onSelectPlatform, selectedPlatform}: Props) {
    const [platformName, setPlatformName] = useState('All Platforms');
    const { data: response, error } = fetchPlatforms();
    if (error) {
        console.log(error.message); 
        return null
    };
    const platforms = response?.results;
    const newPlatforms = [{id: null, name: 'All Platforms', slug: 'all-platforms'}, ...(platforms || [])]

  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>}>{platformName}</MenuButton>
        <MenuList>
            {newPlatforms.map(platform =>
                <MenuItem 
                    key={platform.id} 
                    onClick={() => {
                        setPlatformName(platform.name); 
                        selectedPlatform !== platform && onSelectPlatform(platform as Platform)}
                    }
                >
                    {platform.name}
                </MenuItem>
            )}
        </MenuList>
    </Menu>
  )
}
