import './index.css'

// Features
import HomePage from "./features/HomePage/HomePage"
import LoginPage from "./features/Auth/LoginPage"
import ListManagementPage from "./features/ListManagementPage/ListManagementPage"
import ShoppingListPage from "./features/ShopingListPage/ShoppingListPage"
import ShoppingCartPage from "./features/ShoppingCartPage/ShoppingCartPage"
//import { useState } from "react"
import { useAuth } from './features/Auth/AuthProvider'

// Context

import { useCurrentView } from "./features/HomePage/ViewProvider"
import { CurrentListProvider} from './features/HomePage/CurrentListProvider'
import LandingPage from './features/HomePage/LandingPage'

function App() {
  const { currentView } = useCurrentView()
  const { user } = useAuth()
  
  return (
    <>
        { !user && <LandingPage /> } 
        { user &&
          <CurrentListProvider>
            <div className="container">
              {currentView === 'home-page' && <HomePage />}
              {currentView === "login-page" && <LoginPage />}
              {currentView === 'shop-page' && <ShoppingListPage/>}
              {currentView === 'cart-page' && <ShoppingCartPage/>}
              {currentView === "list-mgmt-page" && <ListManagementPage/>}
            </div>
          </CurrentListProvider>
        }
        
    </>
  )
}

export default App
