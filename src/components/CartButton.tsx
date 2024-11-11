

export default function CartButton(props: string | number) {
    return (
        props.itemCount >0 && <button 
            role="button" 
            className='cart-button'>
            <div className="cart-btn-text">{props.text}</div>
            <span className="cart-button-count">{props.itemCount}</span>
            <img className='icon-button' src={('src/assets/cart-shopping-solid.svg')} alt="icon" />
        </button>
        
    )
}