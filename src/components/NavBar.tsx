import { HStack, Image } from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import ColorModeSwitch from './ColorModeSwitch'
import SearchInput from './SearchInput'
// import { SearchProps } from './SearchInput'

export default function NavBar() {
  return (
      <HStack padding={5}>
        <Image src={logo} boxSize='60px'></Image>
        <SearchInput/>
        <ColorModeSwitch/>
      </HStack>
  )
}
