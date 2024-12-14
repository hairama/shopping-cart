import { useCurrentView } from "../features/HomePage/ViewProvider"
import backArrow from '../../public/assets/arrow-left-solid.svg'

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
                <img className='back-arrow' src={backArrow} alt="back" />
        </button> 
    )
}