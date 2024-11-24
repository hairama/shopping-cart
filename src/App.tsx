//import React from "react"
//import { useState, useEffect, useContext} from 'react'

import './index.css'

// Features
import HomePage from "./features/HomePage/HomePage"
//import ShoppingCartPage from './features/ShoppingCartPage/ShoppingCartPage'
import LoginPage from "./features/Auth/LoginPage"
import ListManagementPage from "./features/ListManagementPage/ListManagementPage"

// Types
//import { ShoppingListItem, ShoppingContextValues } from "./types/ShoppingListTypes"
//import { useShoppingList} from "./features/storage/index"

// Context
import { AuthProvider } from "./features/Auth/AuthProvider"
import ShoppingListPage from "./features/ShopingListPage/ShoppingListPage"
import { useCurrentView } from "./features/HomePage/ViewProvider"

//const ShoppingContext = React.createContext<ShoppingContextValues | undefined>(undefined)

function App() {
  
  
  const { currentView} = useCurrentView()

  // const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])
  // const shoppingListData = useShoppingList().data
  // const pushData = useFirebasePush('shopping-list', {
  //   name: itemToAdd,
  //   status: "on_shopping_list"
  // });
  
  

  // if (shoppingListInDb === null) {
  //   return (<div>Loading...</div>)
  // }
  
  return (
    <>
      <AuthProvider>
          <div className="container">
            {currentView === 'home-page' && <HomePage />}
            {currentView === "login-page" && <LoginPage/>}
              {currentView === 'shop-page' && <ShoppingListPage />}
              {currentView === "list-mgmt-page" && <ListManagementPage/>}
          </div>
      </AuthProvider>
    </>
  )
}

export default App
//export { ShoppingContext }
