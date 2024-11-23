import CatPic from "../../components/CatPic";
import BackArrowButton from "../../components/BackArrowButton";
import { ShoppingContext } from "../../App";
import React from 'react'

export default function ShoppingList() {
    const context = React.useContext(ShoppingContext)   
    if (!context) {
        throw new Error("ShoppingList must be used within a ShoppingContext.Provider");
    }
    
    const { setCurrentView } = context
    

    return (
        <>
            <BackArrowButton
                setCurrentView={setCurrentView}
                view="home-page"
            />
            
            <CatPic />
        </>
    )
}