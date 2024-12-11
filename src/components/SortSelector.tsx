import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGlobalStateStore from "../state-store";

export default function SortSelector() {
    const orderingState = useGlobalStateStore(store => store.orderingState);
    const setOrderingState = useGlobalStateStore(store => store.setOrderingState);

    const sortOrders = [
        {label: 'Relevance', value: null},
        {label: 'Date Added', value: '-added'},
        {label: 'Name', value: 'name'},
        {label: 'Release date', value: '-released'},
        {label: 'Popularity', value: 'metacritic'},
        {label: 'Average rating', value: 'rating'},
    ];

    const setSortOrder = useGlobalStateStore(store => store.setSortOrder);
    const selectedOrder = useGlobalStateStore(store => store.gameQuery.sortOrder);

  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown/>}>Order by: {orderingState}</MenuButton>
        <MenuList>
            {sortOrders.map((order, index) =>
                <MenuItem 
                    key={index} 
                    onClick={() => {
                        setOrderingState(order.label); 
                        selectedOrder !== order.value && setSortOrder(order.value)}
                    }
                >
                    {order.label}
                </MenuItem>
            )}
        </MenuList>
    </Menu>
  )
}
