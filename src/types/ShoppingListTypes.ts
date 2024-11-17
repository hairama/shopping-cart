export interface ShoppingListItem {
    id: string,
    name: string,
    status: string
}

export interface ShoppingListProps {
    shoppingListInDb: ShoppingListItem[]
  }

  export interface ShoppingContextValues {
    shoppingListInDb: ShoppingListItem,
    setShoppingListInDb: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
}