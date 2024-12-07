//import { useState } from "react"

// Components
import CatPic from "../../components/CatPic";
import BackArrowButton from "../../components/BackArrowButton";
import ShoppingList from "../../components/ShoppingList";

// Hooks
import { useCurrentList } from "../HomePage/CurrentListProvider";

export default function ShoppingCartPage() {

    const list = useCurrentList().currentList
    
    return (
        <>
            <div className="navHeaderFlexContainer">
              <BackArrowButton 
                view={"shop-page"}
              />
            </div>
            <CatPic />
            <ul className="cart-list shopping-list">
            <ShoppingList 
                listId={list.listId}
                listName={list.listName}
            />
            </ul>
            
        </>
    )
}
