interface MessageModalProps {
    message: string
    buttonOneText: string
    buttonOneOnClick: ()=>void
    buttonTwoText?: string
    buttonTwoOnClick?: ()=>void

}

export default function MessageModal({message, buttonOneText, buttonOneOnClick, buttonTwoText, buttonTwoOnClick}: MessageModalProps) {
    console.log("Displaying message modal")
    
    return (
        <>
            <div className="overlay">
                <div className="modal-container">
                    <p>{message}</p>
                    <button
                        className="modal-button-one"
                        onClick={buttonOneOnClick}
                    >
                        {buttonOneText}
                    </button>
                    {buttonTwoText && 
                    <button
                        className="modal-button-two"
                        onClick={buttonTwoOnClick}
                    >
                        {buttonTwoText}
                    </button>
                    }
                </div>
            </div>
            
        </>
    )
}