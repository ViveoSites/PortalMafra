import classNames from 'classnames'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import { sendFormData } from '~/services/forms'

import styles from './form.module.css'

const FormSchema = Yup.object().shape({
  yourName: Yup.string().required(),
  yourEmail: Yup.string().email().required(),
  yourMessage: Yup.string(),
})

const Form = ({ formId }) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formMessageFeedback, setFormMessageFeedback] = useState('')

  const formik = useFormik({
    initialValues: {
      yourName: '',
      yourEmail: '',
      yourMessage: '',
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      if (isLoading) {
        return false
      }

      setIsLoading(true)

      const response = await sendFormData({
        formId,
        data: values,
      })

      setFormMessageFeedback(response.data?.message)
      setIsSubmitted(true)
      setIsLoading(false)

      setTimeout(() => {
        setIsSubmitted(true)
        setFormMessageFeedback('')
      }, 4000)
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="form relative grid grid-cols-2 gap-4 max-w-[700px]"
      noValidate
    >
      <div className="mb-4 col-span-2 md:col-span-1">
        <label htmlFor="yourName" className={styles.label}>
          Nome
        </label>
        <input
          type="text"
          name="yourName"
          onChange={formik.handleChange}
          value={formik.values.yourName}
          className={classNames(styles.input, {
            [styles.inputError]:
              formik.errors.yourName && formik.touched.yourName,
            [styles.inputDefault]:
              !formik.errors.yourName || !formik.touched.yourName,
          })}
          required
        />
      </div>
      <div className="mb-4 col-span-2 md:col-span-1">
        <label htmlFor="yourEmail" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          name="yourEmail"
          onChange={formik.handleChange}
          value={formik.values.yourEmail}
          className={classNames(styles.input, {
            [styles.inputError]:
              formik.errors.yourEmail && formik.touched.yourEmail,
            [styles.inputDefault]:
              !formik.errors.yourEmail || !formik.touched.yourEmail,
          })}
          required
        />
      </div>
      <div className="mb-4 col-span-2">
        <label htmlFor="yourMessage" className={styles.label}>
          Mensagem
        </label>
        <textarea
          name="yourMessage"
          onChange={formik.handleChange}
          value={formik.values.yourMessage}
          className={classNames(styles.input, styles.inputTextarea, {
            [styles.inputError]:
              formik.errors.yourMessage && formik.touched.yourMessage,
            [styles.inputDefault]:
              !formik.errors.yourMessage || !formik.touched.yourMessage,
          })}
        />
      </div>
      <div className="col-span-2 flex justify-between flex-col md:items-center md:flex-row-reverse">
        <button type="submit" className={styles.btn} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
        {isSubmitted && formMessageFeedback && (
          <div>
            <p>{formMessageFeedback}</p>
          </div>
        )}
      </div>
    </form>
  )
}

export default Form
