interface ShoppingListProps {
    shoppingListInDb: string[];
    removeListItem: (item: string) => void;
  }

export default function ShoppingList({ shoppingListInDb, removeListItem }: ShoppingListProps) {
    
    if (shoppingListInDb.length > 0) {
        const shoppingListItems = shoppingListInDb.map((item: string) => 
            <li 
                key={item}
                onClick={()=>removeListItem(item)}
            >{item}
            </li>
        )
        return (
            shoppingListItems
        ) 
    }   else {
        return <p>No items here... yet</p>
    }
}