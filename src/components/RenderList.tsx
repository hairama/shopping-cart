import { ShoppingListItem, ShoppingListProps } from "../types/ShoppingListTypes"
import { useFirebaseUpdate } from "../features/storage/index"

export default function RenderList({ shoppingListInDb }: ShoppingListProps) {
    
    const toggleStatus = (item: ShoppingListItem) => {
        
        const updatedStatus = item.status === "on_shopping_list" ? "in_cart" : "on_shopping_list";
        // Call the update hook with the new status
        const updateData = useFirebaseUpdate(`shopping-list/${item.id}`, {
          status: updatedStatus
        });
        updateData(); // Trigger the update operation
    };
    
    if (shoppingListInDb.length > 0) {
        const shoppingListItems = shoppingListInDb.map((item: ShoppingListItem) => 
            item.status === "on_shopping_list" &&
            <li 
                key={item.id}
                onClick={()=>toggleStatus(item)}
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