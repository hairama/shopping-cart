interface CartButtonProps {
    setCurrentView: (view: string) => void,
    text: string,
    itemCount: number
}

export default function CartButton({setCurrentView, itemCount, text}: CartButtonProps) {
    return (
        itemCount >0 && <button 
            role="button" 
            className='cart-button'
            onClick={()=>setCurrentView("shopping-cart")}>
            <div className="cart-btn-text">{text}</div>
            <span className="cart-button-count">{itemCount}</span>
            <img className='icon-button' src={('src/assets/cart-shopping-solid.svg')} alt="icon" />
        </button>
        
    )
}