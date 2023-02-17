import { useContext } from 'react'

import GlobalContext from '~/contexts/global'

function useGlobal() {
  return useContext(GlobalContext)
}

export default useGlobal
