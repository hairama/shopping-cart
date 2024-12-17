import { useCurrentView } from "../features/HomePage/ViewProvider"

interface IconButtonProps {
    view: string
    iconUrl: string
}

export default function IconButton({ view, iconUrl }: IconButtonProps) {
    const { setCurrentView } = useCurrentView()
    
    return (
        <button 
            role="button" 
            className='icon-button-top-right'
            onClick={()=>setCurrentView(view)}
        >
                <img className='icon-image-top-right' src={(iconUrl)} alt="icon" />
        </button> 
    )
}