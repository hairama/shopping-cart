import InputButton from "../../components/Input/InputButton"
import { useCurrentView } from "./ViewProvider"
import { useAuth } from "../Auth/AuthProvider"
import { useUserLists, useShoppingList } from "../storage/useFirebaseData"
import { useCurrentList } from "./CurrentListProvider"
import { ShoppingListItem } from "../../types/ShoppingListTypes"
import React, { useCallback, useState} from "react";

export default function ListOfLists() {
    console.log("Rendering List of Lists")

    const { user } = useAuth();
    const { currentView, setCurrentView } = useCurrentView();
    const { currentList, setCurrentList } = useCurrentList();
    
    if (user !== null) {
      const userId: string = user.uid
      const getListData = useUserLists(userId).data;
      
      const loadSelectedList = useCallback((id: string) => {
        setCurrentList(id)
        setCurrentView("shop-page");
        
        console.log(`current list: ${"stuff"})}
                      user: ${user?.first_name}
                      current view: ${currentView}
                    `)
                    
        if (getListData !== null) {
          console.log(`current list: ${"stuff"})}
                      user: ${user?.first_name}
                      current view: ${currentView}
                    `)
          
        // if (shoppingListInFirebase !== null) {
        //   setShoppingListInDb(shoppingListInFirebase);
        }
      }, [setCurrentList, setCurrentView])
        
      let listElements: JSX.Element[] = [<p key="default">Create a new list to get started</p>];
    
      if (user !== null && getListData !== null) {
        listElements = getListData.map((list: any) => 
          {
            const id:string = list.id
            //const listLoad = React.useMemo(()=> {loadSelectedList(id)},[])
            return (
                    <InputButton
                      key={id}
                      onClick={() =>loadSelectedList(id)}
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