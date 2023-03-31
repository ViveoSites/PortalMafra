/* eslint-disable unicorn/consistent-function-scoping */
import { createContext, useState } from 'react'

export interface ICartContext {
  state: GlobalState
  setState: Dispatch<GlobalState>
  loadData: () => void
  // eslint-disable-next-line no-unused-vars
  setData: (globalData: GlobalState) => void
}

const initialState: ICartContext = {
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
}

export const CartContext = createContext<{ ICartFunctions: any }>(undefined)

export default function CartProvider({ children }) {
  const [products, setProducts] = useState([])

  function addToCart(id) {
    const copyProductsCart = [...products]

    const item = copyProductsCart.find((product) => product.id === id)

    if (item) {
      item.qtd = item.qtd + 1
    } else {
      copyProductsCart.push({ id: id, qtd: 1 })
    }

    setProducts(copyProductsCart)
  }

  function removeFromCart(id) {
    const copyProductsCart = [...products]

    const item = copyProductsCart.find((product) => product.id === id)

    if (item && item.qtd > 1) {
      item.qtd = item.qtd - 1
      setProducts(copyProductsCart)
    } else {
      const arrayFiltered = copyProductsCart.filter(
        (product) => product.id !== id
      )
      setProducts(arrayFiltered)
    }
  }

  function clearCart() {
    setProducts([])
  }

  return (
    <CartContext.Provider
      value={{ products, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
