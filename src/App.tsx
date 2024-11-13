import React from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, onValue, remove, update } from "firebase/database"




import { useState, createContext } from 'react'
import cat from './assets/cat.png'
import './index.css'
import ShoppingList from './components/ShoppingList'
import CartButton from './components/CartButton'
import BackArrow from './components/BackArrow'



const ShoppingContext = createContext()

function App() {
  const appSettings = {
    databaseURL: "https://realtime-database-69249-default-rtdb.firebaseio.com/"
  }
  const app = initializeApp(appSettings)
  const database = getDatabase(app)
  const shoppingListInFirebase = ref(database, "shoppingList")

  const [itemToAdd, setItemToAdd] = useState("")
  const [shoppingListInDb, setShoppingListInDb] = useState([])
  const [cartItemCount, setCartItemCount] = useState<number>(0)
  const [selectedStore, setSelectedStore] = useState<string>("Trader Joes")

  React.useEffect(()=> {
    onValue(shoppingListInFirebase, function(snapshot) {
        // if (snapshot.exists()) {
            
            let shoppingListItemArrays = Object.entries(snapshot.val())
            console.log(shoppingListItemArrays)

            const shoppingListObjectArray = shoppingListItemArrays.map((item) => {
                return { 
                  id : item[0],
                  name: item[1].name,
                  status: item[1].status

                }
            })
            // for (let i = 0; i < shoppingListItemArrays.length; i++) {
            //     let currentItem = shoppingListItemArrays[i]
            //     let currentItemID = currentItem[0]
            //     let currentItemValue = currentItem[1]
            // } 
        // }
        // console.log(shoppingListObjectArray)
        setShoppingListInDb(shoppingListObjectArray)
    })
  },[])

  

  return (
    <ShoppingContext.Provider value={{cartItemCount, selectedStore}}>
      
      <div className="container">
      <BackArrow />
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
          >Add to cart</button>
        <ul id="shopping-list">
          <ShoppingList 
            shoppingListInDb={shoppingListInDb}
            removeListItem={(item: string)=>removeListItem(item)}
          />
        </ul>
        <CartButton 
          text={selectedStore}
          itemCount={cartItemCount}
        />
      </div>
    </ShoppingContext.Provider>
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
    setItemToAdd((input)=> input="")
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      getInput()
    }
  }

  function removeListItem(item): void {
    setCartItemCount((prevNumber: number) => prevNumber + 1)
    // setShoppingListInDb((items) => items.filter((i) => i !== item))
    let exactLocationOfItemInDB = ref(database, `shoppingList/${item.id}`)
        
        update(exactLocationOfItemInDB, {status: "in_cart"})
    return
  }
}

export default App
export { ShoppingContext }
