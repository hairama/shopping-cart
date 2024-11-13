import { ShoppingListProps } from "../../types/ShoppingListTypes"

export default function CartList({ shoppingListInDb, removeListItem }: ShoppingListProps) {
    
    if (shoppingListInDb.length > 0) {
        const shoppingListItems = shoppingListInDb.map((item) => 
            item.status === "in_cart" &&
            <li 
                key={item.id}
                onClick={()=>removeListItem(item)}
            >{item.name}
            </li>
        )
        return (
            <>
                <h1></h1>
                <ul>                   
                {shoppingListItems}
                </ul>
            </>
        ) 
    }   else {
        return <p>No items here... yet</p>
    }
}
