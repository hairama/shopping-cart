interface CartButtonProps {
    setCurrentView: (view: string) => void,
    text: string,
    cartItemCount: number
}

export default function CartButton({setCurrentView, cartItemCount, text}: CartButtonProps) {
    return (
        cartItemCount > 0 && <button 
            role="button" 
            className='cart-button'
            onClick={()=>setCurrentView("shopping-cart")}>
            <div className="cart-btn-text">{text}</div>
            <span className="cart-button-count">{cartItemCount}</span>
            <img className='icon-button' src={('/assets/cart-shopping-solid.svg')} alt="icon" />
        </button>
        
    )
}