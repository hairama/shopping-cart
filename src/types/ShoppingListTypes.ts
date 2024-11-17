export interface ShoppingListItem {
    id: string,
    name: string,
    status: string
}

export interface ShoppingListProps {
    shoppingListInDb: ShoppingListItem[],
    cartItemCount: number
    setCartItemCount: React.Dispatch<React.SetStateAction<setCartItemCount>>
    // removeListItem: (item: ShoppingListItem) => void;
  }

  export interface ShoppingContextValues {
    shoppingListInDb: ShoppingListItem,
    setShoppingListInDb: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
}