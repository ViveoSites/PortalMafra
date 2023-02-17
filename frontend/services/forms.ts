import clientApi from '~/utils/client-api'

export const sendFormData = async ({ formId, data }) => {
  const parameters = new URLSearchParams()
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  for (const key of Object.keys(data)) {
    parameters.append(key, data[key])
  }

  return clientApi().post(`/wp/v2/forms/${formId}`, parameters, config)
}
