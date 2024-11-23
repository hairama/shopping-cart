import InputButton from "../../components/Input/InputButton"


export default function ListOfLists() {
    return (
        <div className = "list-of-lists">
            <InputButton
                onClick={()=>console.log("Trader Joes")}
                text="Trader Joes"
            />
            <InputButton
                onClick={()=>console.log("Trader Joes")}
                text="Whole Foods"
            />
            <InputButton
                onClick={()=>console.log("Trader Joes")}
                text="Costco"
            />
        </div>
    )
}