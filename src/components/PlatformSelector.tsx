import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import fetchPlatforms from '../hooks/fetchPlatforms'
import { useState } from 'react';

interface Props {
    onSelectPlatform: (id: number|null) => void;
}

export default function PlatformSelector({onSelectPlatform}: Props) {
    const [platformName, setPlatformName] = useState('All Platforms');
    const {data, error, isLoading} = fetchPlatforms();
    if (error) return null;
    const newData = [{id: null, name: 'All Platforms', slug: 'all-platforms'},...data]

  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>}>{platformName}</MenuButton>
        <MenuList>
            {newData.map(platform =>
                <MenuItem key={platform.id} onClick={() => {setPlatformName(platform.name); onSelectPlatform(platform.id)}}>
                    {platform.name}
                </MenuItem>
            )}
        </MenuList>
    </Menu>
  )
}
