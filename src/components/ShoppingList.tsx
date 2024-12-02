import { ShoppingListItem, ShoppingListProps } from "../types/ShoppingListTypes"
import { useFirebaseUpdate, useShoppingList } from "../features/storage/index"
import { useEffect, useState } from "react" 




export default function ShoppingList({ listId }: ShoppingListProps) {
    //console.log("Rendering ShoppingList Component")
    
    const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])
    const itemList: any = useShoppingList(listId)
    //console.log(`item list: ${itemList.data}`)
    useEffect(() => {
        console.log("setting ShoppingList")
        
        if (itemList !== shoppingListInDb) {
            console.log("shoppinglist set to item list")
            setShoppingListInDb(itemList.data)

        }
    }, [])

    //console.log(`Item List: ${itemList}`)
    //console.log(`Item List:`, JSON.stringify(itemList, null, 2));
    // listId: ${listId}
    // itemList: ${JSON.stringify(itemList, null, 2)}

    const newList = shoppingListInDb
    console.log(newList)
    console.log(`ShoppingList component: 
                    
                    shopListInDb: ${JSON.stringify(shoppingListInDb, null, 2)}`)

    // Toggle item status
    const toggleStatus = (item: ShoppingListItem) => {
        
        const updatedStatus = item.status === "on_shopping_list" ? "in_cart" : "on_shopping_list";
        // Call the update hook with the new status
        const updateData = useFirebaseUpdate(`lists/${listId}/items/${item.id}`, {
          status: updatedStatus
        });
        updateData(); // Trigger the update operation
    };

    console.log(`New list length:  ${newList.length}`)
    //console.log(`Shopping List in DB: ${shoppingListInDb}`)

    if (newList.length > 0) {
        const shoppingListItems = newList.map((item: ShoppingListItem) => 
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