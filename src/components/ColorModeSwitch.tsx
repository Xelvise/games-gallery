import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

export default function ColorModeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <div>
      <HStack>
        <Switch colorScheme="green" isChecked={colorMode==='dark'} onChange={toggleColorMode}/>
        <Text>Dark Mode</Text>
      </HStack>
    </div>
  )
}
