interface IconButtonProps {
    iconUrl: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    
}

export default function IconButton({ iconUrl, onClick }: IconButtonProps) {
    return (
        <button 
            role="button" 
            className='icon-button-top-right'
            onClick={onClick}>
                <img className='back-arrow' src={(iconUrl)} alt="icon" />
        </button> 
    )
}