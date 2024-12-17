import { ShoppingListItem, ShoppingListProps } from "../types/ShoppingListTypes";
import { useFirebaseUpdate, useShoppingList } from "../features/storage/index";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";
import ClearCartButton from "./ClearCartButton";
import { useCurrentView } from "../features/HomePage/ViewProvider";
//import { batchUpdateStatus } from "../features/storage/useFirebaseUpdate";

export default function ShoppingList({listId}: ShoppingListProps) {
    
    const { currentView } = useCurrentView()
    const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([]);
    let itemList: any  = useShoppingList(listId).data;

    useEffect(() => {
        if (itemList) {
            setShoppingListInDb(itemList)
        } 
    }, [itemList]);

    // Calculate cart item count
    const cartItemCount = shoppingListInDb.filter(
        (item) => item.status === "in_cart"
        ).length
    

    // Filter and map shopping list items
    const listStatus:string = currentView === 'shop-page' ? 'on_shopping_list' : 'in_cart'

    const shoppingListItems = shoppingListInDb
        .filter((item) => item.status  === listStatus)
        .map((item) => {
            return (
                <li 
                    key={item.id} 
                    onClick={() => toggleStatus(item)}>
                    {item.name}
                </li>
            )
        }       
        );

    // Toggle item status
    const toggleStatus = (item: ShoppingListItem) => {
        const updatedStatus =
            item.status === "on_shopping_list" ? "in_cart" : "on_shopping_list";

        const updateData = useFirebaseUpdate(`lists/${listId}/items/${item.id}`, {
            status: updatedStatus,
        });
        updateData(); 
    }; 

    if (shoppingListInDb.length === 0) {
        return <p>No items here... yet</p>;
    } else {
        return (
            <>
                {shoppingListItems}
                {currentView === "shop-page" &&
                    <CartButton 
                        cartItemCount={cartItemCount}
                        view='cart-page'
                    />
                }
                { currentView === "cart-page" && 
                    <ClearCartButton 
                        shoppingListInDb={shoppingListInDb}
                        cartItemCount={cartItemCount}
                        listId={listId}
                    />
                }
                
            </>
        );
    }
}