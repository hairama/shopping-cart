import { useCurrentView } from "../features/HomePage/ViewProvider"
interface CartButtonProps {
    view: string
    cartItemCount: number
    listName: string
}

export default function CartButton({listName, cartItemCount, view}: CartButtonProps) {
    const { setCurrentView } = useCurrentView()

    return (
        cartItemCount > 0 && <button 
            role="button" 
            className='cart-button'
            onClick={()=>setCurrentView(view)}
            >
            <div className="cart-btn-text">{listName}</div>
            <span className="cart-button-count">{cartItemCount}</span>
            <img className='icon-button' src={('/assets/cart-shopping-solid.svg')} alt="icon" />
        </button>
        
    )
}