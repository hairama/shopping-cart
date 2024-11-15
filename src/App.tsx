import React from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, onValue, update } from "firebase/database"



import { useState, createContext } from 'react'
import cat from './assets/cat.png'
import './index.css'
import ShoppingList from './components/ShoppingList'
import CartButton from './components/CartButton'
import BackArrowButton from './components/BackArrowButton'
import ShoppingCart from './features/ShoppingCart/ShoppingCart'
import { ShoppingListItem, ShoppingContextValues } from "./types/ShoppingListTypes"

const ShoppingContext = createContext({})

function App() {
  const appSettings = {
    databaseURL: "https://realtime-database-69249-default-rtdb.firebaseio.com/"
  }
  const app = initializeApp(appSettings)
  const database = getDatabase(app)
  const shoppingListInFirebase = ref(database, "shoppingList")

  const [itemToAdd, setItemToAdd] = useState("")
  const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])
  const [cartItemCount, setCartItemCount] = useState<number>(0)
  const selectedStore: string = "Trader Joes"
  // const [selectedStore, setSelectedStore] = useState<string>("Trader Joes")
  const [currentView, setCurrentView] = useState<string>("shopping-list")

  

  React.useEffect(()=> {
    onValue(shoppingListInFirebase, function(snapshot) {
            
            let shoppingListItemArrays = Object.entries(snapshot.val())
          
            const shoppingListObjectArray = shoppingListItemArrays.map((item) => {
                return { 
                  id : item[0],
                  // @ts-ignore
                  name: item[1].name,
                  // @ts-ignore
                  status: item[1].status
                }
            })
        setShoppingListInDb(shoppingListObjectArray)
    })
  },[])

  return (
    <>
      <ShoppingContext.Provider value={{shoppingListInDb, setShoppingListInDb}}>
        <div className="container">
        <BackArrowButton 
          setCurrentView={setCurrentView}/>
          {currentView === "shopping-list" && (
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
              <ShoppingList 
                shoppingListInDb={shoppingListInDb}
                removeListItem={(item: ShoppingListItem)=>removeListItem(item)}
              />
            </ul>
          </>)}
          { currentView === "shopping-cart" && (
            <ShoppingCart 
            shoppingListInDb={shoppingListInDb}
            removeListItem={(item: ShoppingListItem)=>removeListItem(item)}
            />)}
          
          <CartButton 
            text={selectedStore}
            itemCount={cartItemCount}
            setCurrentView={setCurrentView}
          />
          
        </div>
      </ShoppingContext.Provider>
      
    </>
  )

  function handleChange(event: any): void {
    setItemToAdd(event.target.value)
  }

  function getInput(): void {
    if(itemToAdd !== "") {
      push(shoppingListInFirebase, {
        name: itemToAdd,
        status: "on_shopping_list"
      })
      // setShoppingListInDb((items)=> [...items, itemToAdd])
    }
    setItemToAdd("")
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      getInput()
    }
  }

  function removeListItem(item: ShoppingListItem): void {
    // setShoppingListInDb((items) => items.filter((i) => i !== item))
    let exactLocationOfItemInDB = ref(database, `shoppingList/${item.id}`)
        if(item.status === "on_shopping_list") {
          update(exactLocationOfItemInDB, {status: "in_cart"})
          setCartItemCount((prevNumber: number) => prevNumber + 1)
        } else if(item.status === "in_cart") {
          update(exactLocationOfItemInDB, {status: "on_shopping_list"})
          setCartItemCount((prevNumber: number) => prevNumber - 1)
        }
    return
  }
}

export default App
export { ShoppingContext }
