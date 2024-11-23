interface CartButtonProps {
    setCurrentView: (view: string) => void,
    text: string,
    cartItemCount: number
}

//   const [cartItemCount, setCartItemCount] = useState<number>(0)
//   const selectedStore: string = "Trader Joes"

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