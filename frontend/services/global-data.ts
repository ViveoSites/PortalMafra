import type { GlobalState } from '~/contexts/global/types'
import { getMenusData } from '~/services/menus'
import { getOptionsData } from '~/services/options'

export const getGlobalData = async (lang: string): Promise<GlobalState> => {
  const responseMenus = await getMenusData({ lang })
  const responseOptions = await getOptionsData({ lang })

  return {
    menus: responseMenus.data,
    options: responseOptions.data,
    currentLocale: lang,
  }
}
