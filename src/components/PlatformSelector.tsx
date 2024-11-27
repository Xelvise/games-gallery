import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import fetchPlatforms from '../hooks/fetchPlatforms'

export default function PlatformSelector() {
    const {data, error, isLoading} = fetchPlatforms();
    if (error) return null;
  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>}>Platforms</MenuButton>
        <MenuList>
            {data.map( platform =>
                <MenuItem key={platform.id}>{platform.name}</MenuItem>
            )}
        </MenuList>
    </Menu>
  )
}
