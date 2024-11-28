import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
    onSort: (sort: string|null) => void;
}

export default function SortSelector({onSort}: Props) {
    const [orderingState, setOrderingState] = useState('Relevance')
    const sortOrders = [
        {label: 'Relevance', value: null},
        {label: 'Date Added', value: '-added'},
        {label: 'Name', value: 'name'},
        {label: 'Release date', value: '-released'},
        {label: 'Popularity', value: 'metacritic'},
        {label: 'Average rating', value: 'rating'},
    ]

  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>}>Order by: {orderingState}</MenuButton>
        <MenuList>
            {sortOrders.map((order, index) =>
                <MenuItem key={index} onClick={() => {setOrderingState(order.label); onSort(order.value)}}>
                    {order.label}
                </MenuItem>
            )}
        </MenuList>
    </Menu>
  )
}
