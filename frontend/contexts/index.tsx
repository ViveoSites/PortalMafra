import { domAnimation, LazyMotion } from 'framer-motion'
import React from 'react'

import { GlobalContextProvider } from './global'

const Contexts = ({ children }) => {
  return (
    <GlobalContextProvider>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </GlobalContextProvider>
  )
}

export default Contexts
