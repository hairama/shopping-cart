export interface ShoppingListItem {
    id: string,
    name: string,
    status: "in_cart" | "on_shopping_list"
}

export interface ShoppingListProps {
    shoppingListInDb: ShoppingListItem[],
    removeListItem: (item: ShoppingListItem) => void;
  }

  export interface ShoppingContextValues {
    shoppingListInDb: ShoppingListItem
    setShoppingListInDb: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
}