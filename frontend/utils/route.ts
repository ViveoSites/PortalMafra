export const isUrlExternal = (url: string) => /^(https?|tel|mailto):/.test(url)

export const removeParameterFromURL = (key: string, sourceURL: string) => {
  let parameter = ''
  let parameters_array = []
  let rtn = sourceURL.split('?')[0]
  let queryString = sourceURL.includes('?') ? sourceURL.split('?')[1] : ''

  if (queryString !== '') {
    parameters_array = queryString.split('&')
    for (var index = parameters_array.length - 1; index >= 0; index -= 1) {
      parameter = parameters_array[index].split('=')[0]
      if (parameter === key) {
        parameters_array.splice(index, 1)
      }
    }
    if (parameters_array.length > 0) {
      rtn = rtn + '?' + parameters_array.join('&')
    }
  }

  return rtn
}
