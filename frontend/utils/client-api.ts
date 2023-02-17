import axios from 'axios'

import { removeParameterFromURL } from '~/utils/route'

const defaultLanguage = process.env.defaultLanguage

const instance = axios.create({
  baseURL: process.env.apiBaseUrl,
})

instance.interceptors.request.use((config) => {
  if (config.url.search(`lang=${defaultLanguage}`) >= 0) {
    config.url = removeParameterFromURL('lang', config.url)
  }

  return config
})

const clientApi = () => {
  return instance
}

export default clientApi
