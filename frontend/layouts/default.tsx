import React, { useContext, useEffect } from 'react'

import GlobalContext from '~/contexts/global'
import type { GlobalState } from '~/contexts/global/types'

interface Properties {
  children: React.ReactNode
  translatedPaths?: string[]
  globalData?: GlobalState
}

const Default: React.FC<Properties> = ({ children, globalData }) => {
  const { setData, loadData } = useContext(GlobalContext)

  useEffect(() => {
    if (globalData) {
      setData(globalData)
    } else {
      loadData()
    }
  }, [setData, loadData, globalData])

  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default Default
