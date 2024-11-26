import InputButton from "../../components/Input/InputButton"
import { useCurrentView } from "./ViewProvider"

export default function ListOfLists() {
    const { setCurrentView } = useCurrentView()
    return (
        <div className = "list-of-lists">
            <InputButton
                onClick={()=>setCurrentView("shop-page")}
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