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

export interface GlobalState {
  menus: IMenus
  options: IOptions
  currentLocale: string
}

export interface IGlobalContext {
  state: GlobalState
  setState: Dispatch<GlobalState>
  loadData: () => void
  // eslint-disable-next-line no-unused-vars
  setData: (globalData: GlobalState) => void
}
