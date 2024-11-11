import { useState, createContext } from 'react'
import cat from './assets/cat.png'
import './index.css'
import ShoppingList from './components/ShoppingList'
import CartButton from './components/CartButton'
import BackArrow from './components/BackArrow'

const ShoppingContext = createContext()

function App() {
  const [itemToAdd, setItemToAdd] = useState("")
  const [shoppingListInDb, setShoppingListInDb] = useState<string[]>([])
  const [cartItemCount, setCartItemCount] = useState<number>(0)
  const [selectedStore, setSelectedStore] = useState<string>("Frader Joes")

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
      setShoppingListInDb((items)=> [...items, itemToAdd])
    }
    setItemToAdd((input)=> input="")
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      getInput()
    }
  }

  function removeListItem(item: string): void {
    setCartItemCount((prevNumber: number) => prevNumber + 1)
    setShoppingListInDb((items) => items.filter((i) => i !== item))
    return
  }
}

export default App
export { ShoppingContext }
