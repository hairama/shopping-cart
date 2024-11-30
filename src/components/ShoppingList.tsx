import { ShoppingListItem, ShoppingListProps } from "../types/ShoppingListTypes"
import { useFirebaseUpdate, useShoppingList } from "../features/storage/index"




export default function ShoppingList({ setShoppingListInDb, shoppingListInDb, listId }: ShoppingListProps) {
    const itemList:any = useShoppingList(listId)
    console.log(`Item List: ${itemList}`)
    setShoppingListInDb(itemList)
    console.log(`ShoppingList component: 
                    listId: ${listId}
                    itemList: ${itemList}
                    shopLisInDb: ${shoppingListInDb}`)
    // Toggle item status
    const toggleStatus = (item: ShoppingListItem) => {
        
        const updatedStatus = item.status === "on_shopping_list" ? "in_cart" : "on_shopping_list";
        // Call the update hook with the new status
        const updateData = useFirebaseUpdate(`lists/${listId}/items/${item.id}`, {
          status: updatedStatus
        });
        updateData(); // Trigger the update operation
    };
    
    //console.log(`Shopping List in DB: ${shoppingListInDb}`)

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