import { ShoppingListItem, ShoppingListProps } from "../types/ShoppingListTypes"


export default function ShoppingList({ shoppingListInDb, removeListItem }: ShoppingListProps) {
    
    if (shoppingListInDb.length > 0) {
        const shoppingListItems = shoppingListInDb.map((item: ShoppingListItem) => 
            item.status === "on_shopping_list" &&
            <li 
                key={item.id}
                onClick={()=>removeListItem(item)}
            >{item.name}
            </li>
        )
        return (
            shoppingListItems
        ) 
    }   else {
        return <p>No items here... yet</p>
    }
}