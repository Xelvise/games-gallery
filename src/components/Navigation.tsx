import { Button, HStack } from "@chakra-ui/react";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import { NavigationSchema } from "../fetch-hooks/fetchData"

interface Props {
    navURLParams: NavigationSchema;
    onNavigate: (pageNo: string|null) => void;
}

export default function Navigation({navURLParams, onNavigate}: Props) {
    let {next, previous} = navURLParams;
    next = next && next.split('page=')[1]
    previous = previous && previous.split('page=')[1] || '0'

    return (
    <HStack spacing={5}>
        <Button 
            leftIcon={<TbArrowNarrowLeft />} 
            onClick={() => previous === '0' ? onNavigate(null) : onNavigate(previous)} 
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