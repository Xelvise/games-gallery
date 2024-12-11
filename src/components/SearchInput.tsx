import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { VscClearAll } from "react-icons/vsc";
import useGlobalStateStore from "../state-store";

export default function SearchInput() {
    // A selector "s" is used to select the updater function out of the entire state object.
    // By so doing, this component is dependent on setSearchText() only, for a rerender to take place.
    const setSearchText = useGlobalStateStore(store => store.setSearchText);
    const searchText = useGlobalStateStore(store => store.gameQuery.searchText);
    const ref = useRef<HTMLInputElement>(null);

    const resetInput = () => {
        if (ref.current) {
            ref.current.value = '';
        // If searchText has already been set to null, then there's no need updating the state again 
            searchText && setSearchText(null);
        }
    };

    return (
        <form onSubmit={event => {
            event.preventDefault();
            if (ref.current) {
                const trimmedValue = ref.current.value.trim();
                trimmedValue ? setSearchText(trimmedValue) : ref.current.value = '';
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
