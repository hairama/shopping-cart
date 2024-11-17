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

const ShoppingContext = React.createContext({})

function App() {
  const [itemToAdd, setItemToAdd] = useState("")
  const [shoppingListInDb, setShoppingListInDb] = useState<ShoppingListItem[]>([])
  const [cartItemCount, setCartItemCount] = useState<number>(0)
  const selectedStore: string = "Trader Joes"
  const [currentView, setCurrentView] = useState<string>("shopping-cart")
  const firebaseData = useFirebaseData()
  
  const pushData = useFirebasePush('shopping-list', {
    name: itemToAdd,
    status: "on_shopping_list"
  });


  useEffect(() => {
    // Set the local state when the Firebase data changes
      if (firebaseData !== null) {
        setShoppingListInDb(firebaseData)
        checkCartItemCount()
      }
  }, [firebaseData]);  // Only run this effect when firebaseData changes
  
    // Adds items to firebase
    function getInput(): void {
      if(itemToAdd !== "") {
        pushData();
      }
      setItemToAdd("")
    }
  
  function checkCartItemCount() {
    if (firebaseData !== null) {

      let itemsInCart = 0
          
      for ( let i = 0; i < shoppingListInDb.length ; i++ ) {
          // console.log(shoppingListInDb[i])
          shoppingListInDb[i].status === "in_cart" ? itemsInCart++ : itemsInCart
      }
          setCartItemCount(itemsInCart)
          console.log(cartItemCount)
      }
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
                setCartItemCount={setCartItemCount}
                cartItemCount={cartItemCount}
              />
            </ul>
          </>)}
          { currentView === "shopping-cart" && (
            <ShoppingCart 
            shoppingListInDb={shoppingListInDb}
            setCartItemCount={setCartItemCount}
            cartItemCount={cartItemCount}
            />)}
          
          <CartButton 
            text={selectedStore}
            cartItemCount={cartItemCount}
            setCurrentView={setCurrentView}
          />
          
        </div>
      </ShoppingContext.Provider>
      
    </>
  )

 

  // function removeListItem(item: ShoppingListItem): void {
    
  //   // setShoppingListInDb((items) => items.filter((i) => i !== item))
  //   // let exactLocationOfItemInDB = ref(database, `shoppingList/${item.id}`)
  //   //     if(item.status === "on_shopping_list") {
  //   //       update(exactLocationOfItemInDB, {status: "in_cart"})
  //   //       setCartItemCount((prevNumber: number) => prevNumber + 1)
  //   //     } else if(item.status === "in_cart") {
  //   //       update(exactLocationOfItemInDB, {status: "on_shopping_list"})
  //   //       setCartItemCount((prevNumber: number) => prevNumber - 1)
  //   //     }
  //   return
  // }
}

export default App
export { ShoppingContext }
