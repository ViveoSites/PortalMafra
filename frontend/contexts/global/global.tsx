import { useRouter } from 'next/router'
import React, { createContext, useCallback, useState } from 'react'

import { getGlobalData } from '~/services/global-data'

import type { GlobalState, IGlobalContext } from './types'

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
}

const GlobalContext = createContext<IGlobalContext>(initialState)

export const GlobalContextProvider = ({ children }) => {
  const { locale } = useRouter()
  const [state, setState] = useState(initialState.state)

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

  return (
    <GlobalContext.Provider
      value={{
        state,
        setState,
        loadData,
        setData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
