import { batchUpdateStatus } from "../features/storage/useFirebaseUpdate";
import { ShoppingListItem } from "../types/ShoppingListTypes";
import { useCurrentView } from "../features/HomePage/ViewProvider";

interface ClearCartButtonProps {
    shoppingListInDb: ShoppingListItem[]
    cartItemCount: number
    listId: string
}

export default function ClearCartButton({shoppingListInDb, listId, cartItemCount}: ClearCartButtonProps) {
    const { setCurrentView } = useCurrentView()
    function clearCart() {
        const itemsToArchive = shoppingListInDb.filter(item => item.status === 'in_cart');
        batchUpdateStatus(listId, itemsToArchive, 'archived');
        setTimeout(()=> {
            setCurrentView('shop-page')
        }, 300)
        
    }


    return (
        <button 
            role="button" 
            className='cart-button'
            onClick={clearCart}
            >
            <div className="cart-btn-text">Clear Cart</div>
            <span className="cart-button-count">{cartItemCount}</span>
            <img className='icon-button' src={('/assets/cart-shopping-solid.svg')} alt="icon" />
        </button>
        
    )
}