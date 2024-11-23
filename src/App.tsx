import React from "react"
import { useState, useEffect } from 'react'
import CatPic from './components/CatPic'
import './index.css'
import ShoppingList from './components/ShoppingList'
import CartButton from './components/CartButton'
import ShoppingCart from './features/ShoppingCart/ShoppingCart'
import { ShoppingListItem, ShoppingContextValues } from "./types/ShoppingListTypes"
import { useShoppingList, useFirebasePush } from "./features/storage/index"
import LoginPage from "./features/Auth/LoginPage"
import { AuthProvider } from "./features/Auth/AuthProvider"
import HomePage from "./features/HomePage/HomePage"


const ShoppingContext = React.createContext<ShoppingContextValues | undefined>(undefined)

function App() {
  const [itemToAdd, setItemToAdd] = useState("")
  const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])
  const [cartItemCount, setCartItemCount] = useState<number>(0)
  const selectedStore: string = "Trader Joes"
  
  const shoppingListData = useShoppingList().data
  
  const pushData = useFirebasePush('shopping-list', {
    name: itemToAdd,
    status: "on_shopping_list"
  });

  const [currentView, setCurrentView] = useState<string>("shopping-list")


  useEffect(() => {
    // Set the local state when the Firebase data changes
      if (shoppingListData) {
        setShoppingListInDb(shoppingListData)
        let itemsInCart = shoppingListData.filter((item) => (item.status === "in_cart"))
        setCartItemCount(itemsInCart.length)
        console.log("I'm running!")
      }
  }, [shoppingListData]);  // Only run this effect when firebaseData changes
  
    // Adds items to firebase
    function getInput(): void {
      if(itemToAdd !== "") {
        pushData();
      }
      setItemToAdd("")
    }
  
    
  
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter") {
        getInput()
      }
    }


  if (shoppingListInDb === null) {
    return (<div>Loading...</div>)
  }
  
  return (
    <>
      <AuthProvider>
      <ShoppingContext.Provider value={{shoppingListInDb, setShoppingListInDb}}>
        <div className="container">
          <HomePage />
          
          
          
          {currentView === "login-page" && <LoginPage/>}
            {currentView === "shopping-list" && (
            <>
              <CatPic/>
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
                >Add to list</button>
              <ul id="shopping-list">
                <ShoppingList 
                  shoppingListInDb={shoppingListInDb}
                />
              </ul>
            </>)}
            { currentView === "shopping-cart" && (
              <ShoppingCart 
              shoppingListInDb={shoppingListInDb}
              />)}
            
            <CartButton 
              text={selectedStore}
              cartItemCount={cartItemCount}
              setCurrentView={setCurrentView}
            />
            
        </div>
      </ShoppingContext.Provider>
      
      </AuthProvider>
      
    </>
  )

}

export default App
export { ShoppingContext }
