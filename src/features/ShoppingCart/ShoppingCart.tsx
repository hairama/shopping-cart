import { ShoppingListProps, ShoppingListItem } from "../../types/ShoppingListTypes"
import { useFirebaseUpdate } from "../storage/index"

export default function CartList({ shoppingListInDb }: ShoppingListProps) {
   
    const toggleStatus = (item: ShoppingListItem) => {
        
        const updatedStatus = item.status === "on_shopping_list" ? "in_cart" : "on_shopping_list";
        
        // Call the update hook with the new status
        const updateData = useFirebaseUpdate(`shopping-list/${item.id}`, {
          status: updatedStatus
        });
        updateData(); // Trigger the update operation
    };


    if (shoppingListInDb.length > 0) {
        const shoppingListItems = shoppingListInDb.map((item) => 
            item.status === "in_cart" &&
            <li 
                key={item.id}
                onClick={()=>toggleStatus(item)}
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
