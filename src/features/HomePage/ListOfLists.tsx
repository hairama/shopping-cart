import InputButton from "../../components/Input/InputButton"
import { useCurrentView } from "./ViewProvider"
import { useAuth } from "../Auth/AuthProvider"
import { useUserLists } from "../storage/useFirebaseData"
import { useCurrentList } from "./CurrentListProvider"
import { set } from "firebase/database"


export default function ListOfLists() {
    const {user} = useAuth()
    const { setCurrentView } = useCurrentView()
    const { setCurrentList } = useCurrentList()

    function loadSelectedList(id: string) {
        setCurrentList(id)
        setCurrentView("shop-page")
    }
    
    let listElements: JSX.Element[] = [<p key="default">Create a new list to get started</p>]

        if (user !== null ) {
            const getListData = useUserLists(user?.uid).data
            
            if (getListData !== null) {
                listElements = getListData.map((list) => (
                    <InputButton
                        key={list.id}
                        onClick={()=>loadSelectedList(list.id)}
                        text={list.list_name} 
                        />
                    ));
                  }
                }

    
    
    return (
        <div className = "list-of-lists">
            {listElements}
        </div>
    )
}