import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { VscClearAll } from "react-icons/vsc";

export interface SearchProps {
    onSearch: (search: string|null) => void;
    searchString: string|null;
}

export default function SearchInput({ onSearch, searchString }: SearchProps) {
    const ref = useRef<HTMLInputElement>(null);

    const resetInput = () => {
        if (ref.current) {
            ref.current.value = '';
        // If searchString has already been set to null, then there's no need updating the state again 
            searchString && onSearch(null);
        }
    };

    return (
        <form onSubmit={event => {
            event.preventDefault();
            if (ref.current) {
                const trimmedValue = ref.current.value.trim();
                trimmedValue ? onSearch(trimmedValue) : ref.current.value = '';
            }
        }}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} marginLeft={10} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search games..."
                    variant={'filled'}
                    marginLeft={10}
                    marginRight={10}
                />
                <InputRightElement onClick={resetInput} children={<VscClearAll />} marginRight={50} />
            </InputGroup>
        </form>
    );
}
