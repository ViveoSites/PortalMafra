import clientApi from '~/utils/client-api'

export const getOptionsData = async ({ lang }) => {
  return clientApi().get(`/wp/v2/options?lang=${lang}&acf_format=standard`)
}
