import React from "react"
import { useState, useEffect } from 'react'

const ShoppingContext = React.createContext<ShoppingContextValues | undefined>(undefined)

useEffect(() => {
    // Set the local state when the Firebase data changes
      if (shoppingListData) {
        setShoppingListInDb(shoppingListData)
        let itemsInCart = shoppingListData.filter((item) => (item.status === "in_cart"))
        setCartItemCount(itemsInCart.length)
        console.log("I'm running!")
      }
  }, [shoppingListData]);  // Only run this effect when firebaseData changes