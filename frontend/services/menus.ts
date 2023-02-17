import clientApi from '~/utils/client-api'

export const getMenusData = async ({ lang }) => {
  return clientApi().get(`/wp/v2/menus?lang=${lang}`)
}
