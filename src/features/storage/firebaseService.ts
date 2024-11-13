import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, update } from "firebase/database"
import React from "react"
import { setShoppingListInDb } from "../../App"
import { ShoppingListItem } from "../ShoppingList/ShoppingListTypes"

const appSettings = {
    databaseURL: "https://realtime-database-69249-default-rtdb.firebaseio.com/"
  }
  const app = initializeApp(appSettings)
  const database = getDatabase(app)
  const shoppingListInFirebase = ref(database, "shoppingList")

  React.useEffect(()=> {
    onValue(shoppingListInFirebase, function(snapshot) {
        // if (snapshot.exists()) {
            
            let shoppingListItemArrays = Object.entries(snapshot.val())
            // console.log(shoppingListItemArrays)

          // interface FirebaseItem {
          //   id: string,
          //   name: unknown,
          //   status: unknown
          // }
          //   const shoppingListObjectArray = shoppingListItemArrays.map((item) => {
          //     // const [id, details] = item as [number, ShoppingListItem];
              
          //     let id: string = item[0]
          //     let data: any = item[1]
          //     let name: string = data.name
          //     let status: any = data.status
          //     return {
          //         id: id,
          //         name: name,
          //         status: status
          //     };
          // });
          
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

  function removeListItem(item: ShoppingListItem): void {
    // setShoppingListInDb((items) => items.filter((i) => i !== item))
    let exactLocationOfItemInDB = ref(database, `shoppingList/${item.id}`)
        if(item.status === "on_shopping_list") {
          update(exactLocationOfItemInDB, {status: "in_cart"})
        //   setCartItemCount((prevNumber: number) => prevNumber + 1)
        } else if(item.status === "in_cart") {
          update(exactLocationOfItemInDB, {status: "on_shopping_list"})
        //   setCartItemCount((prevNumber: number) => prevNumber - 1)
        }
    return
  }
  
export default shoppingListInFirebase
export { removeListItem }