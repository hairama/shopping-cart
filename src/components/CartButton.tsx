interface CartButtonProps {
    //setCurrentView: (view: string) => void,
    cartItemCount: number
    listName: string
    
}

//   const [cartItemCount, setCartItemCount] = useState<number>(0)
//   const selectedStore: string = "Trader Joes"
//onClick={()=>setCurrentView("shopping-cart")}

export default function CartButton({listName, cartItemCount}: CartButtonProps) {
    return (
        cartItemCount > 0 && <button 
            role="button" 
            className='cart-button'
            >
            <div className="cart-btn-text">{listName}</div>
            <span className="cart-button-count">{cartItemCount}</span>
            <img className='icon-button' src={('/assets/cart-shopping-solid.svg')} alt="icon" />
        </button>
        
    )
}