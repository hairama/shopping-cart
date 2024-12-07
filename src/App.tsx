import './index.css'

// Features
import HomePage from "./features/HomePage/HomePage"
import LoginPage from "./features/Auth/LoginPage"
import ListManagementPage from "./features/ListManagementPage/ListManagementPage"
import ShoppingListPage from "./features/ShopingListPage/ShoppingListPage"
import ShoppingCartPage from "./features/ShoppingCartPage/ShoppingCartPage"

// Context
import { AuthProvider } from "./features/Auth/AuthProvider"
import { useCurrentView } from "./features/HomePage/ViewProvider"
import { CurrentListProvider} from './features/HomePage/CurrentListProvider'

function App() {
  const { currentView} = useCurrentView()
  
  return (
    <>
      <AuthProvider>
        <CurrentListProvider>
          <div className="container">
            {currentView === 'home-page' && <HomePage />}
            {currentView === "login-page" && <LoginPage/>}
            {currentView === 'shop-page' && <ShoppingListPage/>}
            {currentView === 'cart-page' && <ShoppingCartPage/>}
            {currentView === "list-mgmt-page" && <ListManagementPage/>}
          </div>
        </CurrentListProvider>  
      </AuthProvider>
    </>
  )
}

export default App
