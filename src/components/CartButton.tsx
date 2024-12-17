import { useCurrentView } from "../features/HomePage/ViewProvider"
import cartPic from "../../public/assets/cart-shopping-solid.svg"
interface CartButtonProps {
    view: string
    cartItemCount: number
}

export default function CartButton({cartItemCount, view}: CartButtonProps) {
    const { setCurrentView } = useCurrentView()

    return (
        cartItemCount > 0 && <button 
            role="button" 
            className='cart-button'
            onClick={()=>setCurrentView(view)}
            >
            <div className="cart-btn-text">{`
                ${cartItemCount} ${cartItemCount > 1 ? ' items in cart' : ' item in cart'}`}</div> 
            <img className='icon-button' src={cartPic} alt="icon" />
        </button>
        
    )
}