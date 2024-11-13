export interface ShoppingListItem {
    id: string,
    name: string,
    status: string
}

export interface ShoppingListProps {
    shoppingListInDb: ShoppingListItem[],
    removeListItem: (item: ShoppingListItem) => void;
  }