interface BackArrowButtonProps {
    setCurrentView: (list: string) => void
}

export default function BackArrowButton({setCurrentView}: BackArrowButtonProps) {
    return (
        <button 
            role="button" 
            className='back-button'
            onClick={()=>setCurrentView("shopping-list")}>
                <img className='back-arrow' src={('/assets/arrow-left-solid.svg')} alt="icon" />
        </button> 
    )
}