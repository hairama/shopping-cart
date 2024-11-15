export interface ShoppingListItem {
    id: string,
    name: string,
    status: "in_cart" | "on_shopping_list"
}

export interface ShoppingContextValues {
    shoppingListInDb: ShoppingListItem
    setShoppingListInDb: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
}

export interface ShoppingListProps {
    shoppingListInDb: ShoppingListItem[]
    setShoppingListInDb: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
    // removeListItem: (item: ShoppingListItem) => void;
}

