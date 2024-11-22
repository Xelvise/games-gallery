import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/logo.webp'

export default function NavBar() {
  return (
    <div>
      <HStack>
        <Image src={logo} boxSize='20'></Image>
        <Text>NavBar</Text>
      </HStack>
    </div>
  )
}
