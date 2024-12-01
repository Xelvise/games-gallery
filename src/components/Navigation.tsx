import { Button, HStack } from "@chakra-ui/react";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import { NavigationSchema } from "../fetch-hooks/fetchData"

interface Props {
    navURLParams: NavigationSchema;
    onNavigate: (pageNo: string|null) => void;
}

export default function Navigation({navURLParams, onNavigate}: Props) {
    let {next, previous} = navURLParams;
// The page no. is the first character[0] of the second string[1], after '...page=' has been extracted
    next = next && next.split('page=')[1][0]
// If previous variable is truthy with a page no., the page state is updated with the extracted value.
// But if previous variable has no page no. (i.e, set to '1'), page state is set to null
// However, If previous is falsy, Previous button is disabled
    if (previous) {
        previous = previous.includes('page=') ? previous.split('page=')[1][0] : '1';
    }

    return (
    <HStack spacing={5}>
        <Button 
            leftIcon={<TbArrowNarrowLeft />} 
            onClick={() => previous === '1' ? onNavigate(null) : onNavigate(previous)} 
            isDisabled={previous ? false : true} 
            colorScheme='white' 
            variant='outline'
        >Previous</Button>

        <Button 
            rightIcon={<TbArrowNarrowRight />} 
            onClick={() => onNavigate(next)} 
            isDisabled={next ? false : true} 
            colorScheme='white' 
            variant='outline' 
        >Next</Button>
    </HStack>
    )
}