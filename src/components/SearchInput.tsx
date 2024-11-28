import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

export interface SearchProps {
    onSearch: (search: string) => void;
}

export default function SearchInput({onSearch}: SearchProps) {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <form onSubmit={event => {
            event.preventDefault();
            if (ref.current) onSearch(ref.current.value);
        }}>
            <InputGroup>
                <InputLeftElement children={<BsSearch/>} marginLeft={10}/>
                <Input 
                    ref={ref} 
                    borderRadius={20} 
                    placeholder="Search games..." 
                    variant={'filled'} 
                    marginLeft={10} 
                    marginRight={10} 
                    // onChange={event => {
                    //     if (ref.current) ref.current.value = event.target.value;
                    // }}
                />
            </InputGroup>
        </form>
    )
}
