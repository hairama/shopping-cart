import { useCurrentView } from "../features/HomePage/ViewProvider"

interface BackArrowButtonProps {
    view: string
}

export default function BackArrowButton({view}: BackArrowButtonProps) {
    const { setCurrentView } = useCurrentView()

    return (
        <button 
            role="button" 
            className='back-button'
            onClick={()=>setCurrentView(view)}>
                <img className='back-arrow' src={('/assets/arrow-left-solid.svg')} alt="icon" />
        </button> 
    )
}