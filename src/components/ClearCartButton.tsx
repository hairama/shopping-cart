import { batchUpdateStatus } from "../features/storage/useFirebaseUpdate";
import { ShoppingListItem } from "../types/ShoppingListTypes";
import { useCurrentView } from "../features/HomePage/ViewProvider";
import MessageModal from "./MessageModal"
import { useState } from "react"

interface ClearCartButtonProps {
    shoppingListInDb: ShoppingListItem[]
    cartItemCount: number
    listId: string
}

export default function ClearCartButton({shoppingListInDb, listId, cartItemCount}: ClearCartButtonProps) {
    const { setCurrentView } = useCurrentView()
    const [isConfirmed, setIsConfirmed] = useState(false)

    function askToConfirm() {
        setIsConfirmed(oldValue => !oldValue)
    }

    function clearCart() {
        const itemsToArchive = shoppingListInDb.filter(item => item.status === 'in_cart');
        batchUpdateStatus(listId, itemsToArchive, 'archived');
        setTimeout(()=> {
            setCurrentView('home-page')
        }, 1000)
        
    }

    const message = `You bought ${cartItemCount} ${cartItemCount > 1 ? "items" : "item" }.`

    return (
        <>
            <button 
                role="button" 
                className='cart-button'
                onClick={askToConfirm}>
                    <div className="cart-btn-text">Clear Cart</div>
                    <img className='icon-button' src={('/assets/cart-shopping-solid.svg')} alt="icon" />
            </button> 
            { isConfirmed == true &&
            <MessageModal 
                message={message}
                buttonOneText="Finish shopping"
                buttonOneOnClick={(clearCart)}
                buttonTwoText="Back"
                buttonTwoOnClick={askToConfirm}
            /> 
            }
        </>
        
    )
}

