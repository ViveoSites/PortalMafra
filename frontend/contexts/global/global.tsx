import { useRouter } from 'next/router'
import React, { createContext, useCallback, useEffect, useState } from 'react'

import { getGlobalData } from '~/services/global-data'

import type { GlobalState, ICartItem, IGlobalContext } from './types'

const initialState: IGlobalContext = {
  state: {
    menus: {
      header: [],
      footer: [],
    },
    options: {
      footer: [],
      footer_description: [],
      footer_channels: [],
      footer_copyright: [],
    },
    currentLocale: '',
  },
  setState: () => {},
  setData: () => {},
  loadData: () => {},
  cart: {
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    isInCart: () => 0,
    getCartItem: () => {},
    toggleCart: () => {},
    cartOpen: false,
  },
}

const GlobalContext = createContext<IGlobalContext>(initialState)

export const GlobalContextProvider = ({ children }) => {
  const { locale } = useRouter()
  const [state, setState] = useState(initialState.state)
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const setData = useCallback((newState: GlobalState) => {
    setState((currentState) => ({
      ...currentState,
      ...newState,
    }))
  }, [])

  const loadData = useCallback(() => {
    if (state?.currentLocale === locale) {
      return
    }

    getGlobalData(locale)
      .then((data) => setData(data))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error))
  }, [locale, setData, state?.currentLocale])

  const addToCart = (newItem: ICartItem) => {
    const copyProductsCart = [...cartItems]
    const item = copyProductsCart.find((product) => product.id === newItem.id)
    if (item === undefined) {
      newItem.quantity = 1
      copyProductsCart.push(newItem)
    } else {
      item.quantity = item.quantity + 1
    }
    setCartItems(copyProductsCart)
  }

  const removeFromCart = (id: number) => {
    const copyProductsCart = [...cartItems]
    const arrayFiltered = copyProductsCart.filter(
      (product) => product.id !== id
    )
    setCartItems(arrayFiltered)
  }

  const getCartItem = (id): ICartItem => {
    return cartItems.find((item) => item.id === id)
  }

  const isInCart = (id) => {
    const item = cartItems.find((item) => item.id === id)
    return item ? item.quantity : 0
  }

  const clearCart = () => {
    setCartItems([])
  }

  const toggleCart = (value) => {
    setCartOpen(value)
  }

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
  }, [cartOpen])

  return (
    <GlobalContext.Provider
      value={{
        state,
        setState,
        loadData,
        setData,
        cart: {
          cartItems,
          addToCart,
          removeFromCart,
          clearCart,
          isInCart,
          getCartItem,
          toggleCart,
          cartOpen,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
