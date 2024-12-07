import InputButton from "../../components/Input/InputButton"
import { useCurrentView } from "./ViewProvider"
import { useAuth } from "../Auth/AuthProvider"
import { useUserLists } from "../storage/useFirebaseData"
import { useCurrentList } from "./CurrentListProvider"
import { useCallback} from "react";

export default function ListOfLists() {

    const { user } = useAuth();
    const { setCurrentView } = useCurrentView();
    const { setCurrentList } = useCurrentList();
    
    if (user !== null) {
      const userId: string = user.uid
      
      // get 'shared_lists' for current user
      const getListData = useUserLists(userId).data;
      
      const loadSelectedList = useCallback((list: any) => {
        setCurrentList({listId: list.id, listName: list.list_name})
        setCurrentView("shop-page");
      }, [setCurrentList, setCurrentView])
        
      let listElements: JSX.Element[] = [<p key="default">Create a new list to get started</p>];
      
      if (user !== null && getListData !== null) {
        listElements = getListData.map((list: any) => 
          {
            const id:string = list.id
            return (
                    <InputButton
                      key={id}
                      onClick={() =>loadSelectedList(list)}
                      text={list.list_name}
                    />
            )     
        }
      ) 
    }    
    
    return (
      <div className="list-of-lists">
        {listElements}
      </div>
    )
  } 

}