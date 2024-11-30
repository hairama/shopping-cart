export interface ShoppingListItem {
    id: string,
    name: string,
    status: any
}

export interface ShoppingListProps {
  setShoppingListInDb: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>  
  shoppingListInDb: ShoppingListItem[]
  listId: string
  }

  export interface ShoppingContextValues {
    shoppingListInDb: ShoppingListItem,
    setShoppingListInDb: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
}