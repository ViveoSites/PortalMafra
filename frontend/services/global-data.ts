import type { GlobalState } from '~/contexts/global/types'
import { getMenusData } from '~/services/menus'

export const getGlobalData = async (lang: string): Promise<GlobalState> => {
  const responseMenus = await getMenusData({ lang })

  return {
    menus: responseMenus.data,
    currentLocale: lang,
  }
}
