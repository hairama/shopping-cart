import React from "react"
import { useState, useEffect } from 'react'
import cat from './assets/cat.png'
import './index.css'
import ShoppingList from './components/ShoppingList'
import CartButton from './components/CartButton'
import BackArrowButton from './components/BackArrowButton'
import ShoppingCart from './features/ShoppingCart/ShoppingCart'
import { ShoppingListItem } from "./types/ShoppingListTypes"
import { useFirebaseData, useFirebasePush } from "./features/storage/index"
import LoginPage from "./features/Auth/LoginPage"
import IconButton from "./components/IconButton"
import { AuthProvider } from "./features/Auth/AuthProvider"

const ShoppingContext = React.createContext({})

function App() {
  const [itemToAdd, setItemToAdd] = useState("")
  const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])
  const [cartItemCount, setCartItemCount] = useState<number>(0)
  const selectedStore: string = "Trader Joes"
  const [currentView, setCurrentView] = useState<string>("shopping-list")
  const firebaseData = useFirebaseData()
  
  const pushData = useFirebasePush('shopping-list', {
    name: itemToAdd,
    status: "on_shopping_list"
  });


  useEffect(() => {
    // Set the local state when the Firebase data changes
      if (firebaseData !== null) {
        setShoppingListInDb(firebaseData)
      }
  }, [firebaseData]);  // Only run this effect when firebaseData changes
  
    // Adds items to firebase
    function getInput(): void {
      if(itemToAdd !== "") {
        pushData();
      }
      setItemToAdd("")
    }
  
  useEffect(() => {
    if (shoppingListInDb.length > 0) {

      let itemsInCart = shoppingListInDb.filter((item) => (item.status === "in_cart"))
          setCartItemCount(itemsInCart.length)
      }
  }, [shoppingListInDb])
    
  
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
        <BackArrowButton 
          setCurrentView={setCurrentView}/>
        <IconButton 
          iconUrl='../assets/circle-user-solid.svg'
          onClick={()=>setCurrentView('login-page')}
        />
        {currentView === "login-page" && <LoginPage/>}
          {currentView === "shopping-list" && (
          <>
            <img src={cat}/>
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
