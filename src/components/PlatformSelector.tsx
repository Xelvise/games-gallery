import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import fetchPlatforms from '../fetch-hooks/fetchPlatforms'
import { useState } from 'react';
import { Platform } from '../fetch-hooks/fetchGames';

interface Props {
    onSelectPlatform: (platform: Platform|null) => void;
    selectedPlatform: Platform|null;
}

export default function PlatformSelector({onSelectPlatform, selectedPlatform}: Props) {
    const [platformName, setPlatformName] = useState('All Platforms');
    const { data } = fetchPlatforms();
    const newData = [{id: null, name: 'All Platforms', slug: 'all-platforms'},...data]

  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>}>{platformName}</MenuButton>
        <MenuList>
            {newData.map(platform =>
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
