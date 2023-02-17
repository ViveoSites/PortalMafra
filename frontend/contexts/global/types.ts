import { Dispatch } from 'react'

export interface IMenus {
  header: IMenusItem[]
  footer: IMenusItem[]
}
export interface IMenusItem {
  id: number
  title: string
  url: string
  acf: any
  children: IMenusItem[]
}

export interface GlobalState {
  menus: IMenus
  currentLocale: string
}

export interface IGlobalContext {
  state: GlobalState
  setState: Dispatch<GlobalState>
  loadData: () => void
  // eslint-disable-next-line no-unused-vars
  setData: (globalData: GlobalState) => void
}
