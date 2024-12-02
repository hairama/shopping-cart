import { useState } from "react"

// Components
import CatPic from "../../components/CatPic";
import BackArrowButton from "../../components/BackArrowButton";
import IconButton from "../../components/IconButton";
import ShoppingList from "../../components/ShoppingList";

// Hooks
import { useFirebasePush } from "../storage";
import { useCurrentList } from "../HomePage/CurrentListProvider";

// Types
import { ShoppingListItem } from "../../types/ShoppingListTypes";



export default function ShoppingListPage() {
    console.log("Rendering ShopPage")
    const [itemToAdd, setItemToAdd] = useState("")
    //const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])
    const listId = useCurrentList().currentList

    const pushData = useFirebasePush(`lists/${listId}/items/`, {
        name: itemToAdd,
        status: "on_shopping_list"
      });

     // Adds items to firebase
     function getInput(): void {
        if(itemToAdd !== "") {
          //console.log(itemToAdd)
            pushData();
        }
        setItemToAdd("")
      }
    
      function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
          getInput()
        }
      }
    

    return (
        <>
            <BackArrowButton 
              view={"home-page"}
            />
            <IconButton 
            view={"list-mgmt-page"}
            iconUrl='../assets/gear-solid.svg'
            />
            <CatPic />
            <input 
                type="text" 
                id="input-field" 
                placeholder="Bread"
                value={itemToAdd}
                onChange={(e)=> setItemToAdd(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button 
                id="add-button"
                onClick={getInput}
                >Add to list
            </button>
            <ul id="shopping-list">
            <ShoppingList 
                listId={listId}
            />
            </ul>
            
        </>
    )
}
