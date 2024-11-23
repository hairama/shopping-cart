// interface BackArrowButtonProps {
//     setCurrentView: (list: string) => void
// }

export default function BackArrowButton() {
    return (
        <button 
            role="button" 
            className='back-button'
        >
                <img className='back-arrow' src={('/assets/arrow-left-solid.svg')} alt="icon" />
        </button> 
    )
}


// export default function BackArrowButton({setCurrentView}: BackArrowButtonProps) {
//     return (
//         <button 
//             role="button" 
//             className='back-button'
//             onClick={()=>setCurrentView("shopping-list")}>
//                 <img className='back-arrow' src={('/assets/arrow-left-solid.svg')} alt="icon" />
//         </button> 
//     )
// }