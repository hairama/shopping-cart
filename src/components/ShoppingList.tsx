import { ShoppingListItem, ShoppingListProps } from "../types/ShoppingListTypes";
import { useFirebaseUpdate, useShoppingList } from "../features/storage/index";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";

export default function ShoppingList({listId, listName}: ShoppingListProps) {
    const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([]);
    //const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItem[]>([])
    let itemList: any  = useShoppingList(listId).data;
    //let shoppingListItemArray: any = []
    //let cartItemCount = 0
    
    // function renderListItems() {
    //     cartItemCount = createCartItemCount()
    //     //shoppingListItemArray = createShoppingListItems()
    //     //setShoppingListItems(shoppingListItemArray)
    //     //setShoppingListItems(shoppingListItemArray)
        
    //     console.log(`shoppingListItems: ${shoppingListItems}`)
        
    // }

    useEffect(() => {
        console.log(`useEffect ran`)
        if (itemList) {
            setShoppingListInDb(itemList)
            //console.log(`itemList: ${itemList[0].name}`)
            // shoppingListItemArray = createShoppingListItems()
            // setShoppingListItems(shoppingListItemArray)
            // renderListItems()   
        } 
    }, [itemList]);

    // Filter and map shopping list items
    const shoppingListItems = shoppingListInDb
        .filter((item) => item.status === "on_shopping_list")
        .map((item) => {
            console.log(`item ${item.name}`)
            return (
                <li 
                    key={item.id} 
                    onClick={() => toggleStatus(item)}>
                    {item.name}
                </li>
            )
        }       
        );
        //console.log(`tempArray: ${tempArray}`)
    
    
    // Calculate cart item count
    const cartItemCount = shoppingListInDb.filter(
        (item) => item.status === "in_cart"
        ).length

    
    // Toggle item status
    const toggleStatus = (item: ShoppingListItem) => {
        const updatedStatus =
            item.status === "on_shopping_list" ? "in_cart" : "on_shopping_list";

        const updateData = useFirebaseUpdate(`lists/${listId}/items/${item.id}`, {
            status: updatedStatus,
        });
        updateData(); // This triggers Firebase updates, which will eventually update `itemList`
    };

    if (shoppingListInDb.length === 0) {
        return <p>No items here... yet</p>;
    } else {

        return (
            <>
                {shoppingListItems}
                <CartButton listName={listName} cartItemCount={cartItemCount} />
            </>
        );
    }
    
}
