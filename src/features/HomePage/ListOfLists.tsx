import InputButton from "../../components/Input/InputButton"
import { useCurrentView } from "./ViewProvider"
import { useAuth } from "../Auth/AuthProvider"
import { useUserLists, useShoppingList } from "../storage/useFirebaseData"
import { useCurrentList } from "./CurrentListProvider"
import { ShoppingListItem } from "../../types/ShoppingListTypes"
import { useState } from "react";

export default function ListOfLists() {

    const { user } = useAuth();
    const { setCurrentView } = useCurrentView();
    const { currentList, setCurrentList } = useCurrentList();
    if (user !== null) {
      const userId: string = user.uid
      const getListData = useUserLists(userId).data; // Also move this to the top level
    
   // const shoppingListInFirebase = useShoppingList().data; // Move this to the top level
    
  
    function loadSelectedList(id: string) {
      setCurrentList(id);
      setCurrentView("shop-page");
      // if (shoppingListInFirebase !== null) {
      //   setShoppingListInDb(shoppingListInFirebase);
      // }
    }
  
    let listElements: JSX.Element[] = [<p key="default">Create a new list to get started</p>];
  
    if (user !== null && getListData !== null) {
      listElements = getListData.map((list) => (
        <InputButton
          key={list.id}
          onClick={() => loadSelectedList(list.id)}
          text={list.list_name}
        />
      ));
    }
  
    return <div className="list-of-lists">{listElements}</div>;
  }
}
  