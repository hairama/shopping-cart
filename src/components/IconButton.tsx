import { useCurrentView } from "../features/HomePage/ViewProvider"

interface IconButtonProps {
    view: string
    iconUrl: string
    //onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    
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



// interface IconButtonProps {
//     iconUrl: string
//     onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    
// }

// export default function IconButton({ iconUrl, onClick }: IconButtonProps) {
//     return (
//         <button 
//             role="button" 
//             className='icon-button-top-right'
//             onClick={onClick}>
//                 <img className='back-arrow' src={(iconUrl)} alt="icon" />
//         </button> 
//     )
// }