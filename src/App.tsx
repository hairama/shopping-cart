import React from "react"
import { useState, useEffect } from 'react'

import './index.css'

// Features
import HomePage from "./features/HomePage/HomePage"
import ShoppingCartPage from './features/ShoppingCartPage/ShoppingCartPage'
import LoginPage from "./features/Auth/LoginPage"
import ListManagementPage from "./features/ListManagementPage/ListManagementPage"

// Types
import { ShoppingListItem, ShoppingContextValues } from "./types/ShoppingListTypes"
import { useShoppingList} from "./features/storage/index"

// Context
import { AuthProvider } from "./features/Auth/AuthProvider"
import ShoppingListPage from "./features/ShopingListPage/ShoppingListPage"

const ShoppingContext = React.createContext<ShoppingContextValues | undefined>(undefined)

function App() {
  const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])
  const shoppingListData = useShoppingList().data
  
  // const pushData = useFirebasePush('shopping-list', {
  //   name: itemToAdd,
  //   status: "on_shopping_list"
  // });
  
  const [currentView, setCurrentView] = useState<string>("list-mgmt-page") 

  if (shoppingListInDb === null) {
    return (<div>Loading...</div>)
  }
  
  return (
    <>
      <AuthProvider>
      <ShoppingContext.Provider value={{shoppingListInDb, setShoppingListInDb}}>
        <div className="container">
          {currentView === 'home-page' && <HomePage />}
          {currentView === 'shop-page' && <ShoppingListPage />}
          {currentView === "login-page" && <LoginPage/>}
          {currentView === "cart-page" && <ShoppingCartPage/>} 
          {currentView === "list-mgmt-page" && <ListManagementPage/>} 
        </div>
      </ShoppingContext.Provider>
      
      </AuthProvider>
      
    </>
  )

}

export default App
export { ShoppingContext }
