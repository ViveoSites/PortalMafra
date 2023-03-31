/* eslint-disable no-unused-vars */
import { Dispatch } from 'react'

export interface IMenus {
  header: IMenusItem[]
  footer: IMenusItem[]
}

export interface IOptions {
  footer_description: any
  footer_channels: any
  footer_copyright: any
  footer: object
}

export interface IMenusItem {
  id: number
  title: string
  url: string
  acf: any
  children: IMenusItem[]
}

export interface ICartItem {
  id: number
  code: string
  category: string
  parentCategory: string
  brand: string
  title: string
  quantity: number
}

export interface GlobalState {
  menus: IMenus
  options: IOptions
  currentLocale: string
}

export interface IProductsData {
  products: any
  categories: any
}

export interface ICartFunctions {
  cartItems: any
  addToCart: (item: ICartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  isInCart: (id: number) => number
  getCartItem: (id: number) => any
  toggleCart: (value: boolean) => void
  cartOpen: boolean
}

export interface IGlobalContext {
  state: GlobalState
  setState: Dispatch<GlobalState>
  loadData: () => void
  setData: (globalData: GlobalState) => void
  cart: ICartFunctions
}
