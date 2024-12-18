import { Button, HStack } from "@chakra-ui/react";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";

interface Props {
    navURLParams: NavigationSchema;
    onNavigate: (pageNo: string|null) => void;
}

export interface NavigationSchema {
    previous: string|null;
    next: string|null;
}

export default function Navigation({navURLParams, onNavigate}: Props) {
    let {next, previous} = navURLParams;
// The page no. is derived from the first one, two or three numeric characters in second string[1], after '...page=' has been extracted
    if (next) {
        next = next.match(/page=(\d{1,3})/)![1];
    }
    // If previous variable is truthy with a page no., the page state is updated with the extracted value.
    // But if previous variable has no page no. (i.e, set to '1'), page state is set to 1
    // However, If previous is falsy, Previous button is disabled
    if (previous) {
        previous = previous.includes('page=') ? previous.match(/page=(\d{1,3})/)![1] : '1';
    }

    return (
    <HStack spacing={5}>
        <Button 
            leftIcon={<TbArrowNarrowLeft />} 
            onClick={() => onNavigate(previous)} 
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