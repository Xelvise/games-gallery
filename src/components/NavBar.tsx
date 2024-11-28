/* eslint-disable @typescript-eslint/no-unused-vars */
import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import ColorModeSwitch from './ColorModeSwitch'
import SearchInput from './SearchInput'
import { SearchProps } from './SearchInput'

export default function NavBar({onSearch}: SearchProps) {
  return (
      <HStack padding={5}>
        <Image src={logo} boxSize='60px'></Image>
        <SearchInput onSearch={onSearch}/>
        <ColorModeSwitch/>
      </HStack>
  )
}
