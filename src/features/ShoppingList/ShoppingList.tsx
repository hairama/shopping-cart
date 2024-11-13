import { ShoppingListItem, ShoppingListProps } from "./ShoppingListTypes"
import cat from '/src/assets/cat.png'
import { useState } from "react"
import shoppingListInFirebase from "../storage/firebaseService"
import { push } from "firebase/database"
import { removeListItem } from "../storage/firebaseService"



export default function ShoppingList({ shoppingListInDb }: ShoppingListProps) {
    
    const [itemToAdd, setItemToAdd] = useState("")
    console.log(shoppingListInDb)
    if (shoppingListInDb.length > 0) {
        const shoppingListItems = shoppingListInDb.map((item: ShoppingListItem) => 
            item.status === "on_shopping_list" &&
            <li 
                key={item.id}
                onClick={()=>removeListItem(item)}
            >{item.name}
            </li>
        )
        return (
            <>
                <img src={cat}/>
                <input 
                    type="text" 
                    id="input-field" 
                    placeholder="Bread"
                    value={itemToAdd}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    id="add-button"
                    onClick={getInput}
                    >Add to list</button>
                <ul id="shopping-list">
                    {shoppingListItems}
                </ul>
            </>
            
        ) 
    }   else {
        return <p>No items here... yet</p>
    }

    function handleChange(event: any): void {
        setItemToAdd(event.target.value)
      }

    function getInput(): void {
    if(itemToAdd !== "") {
        push(shoppingListInFirebase, {
        name: itemToAdd,
        status: "on_shopping_list"
        })
    }
    setItemToAdd("")
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
          getInput()
        }
    }

}