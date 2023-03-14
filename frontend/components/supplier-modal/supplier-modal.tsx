import classNames from 'classnames'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

import Modal from '~/components/modal'
import ArrowRight from '~/icons/arrow-right.svg'
import { sendFormData } from '~/services/forms'

import styles from './form.module.css'

interface Properties {
  isOpen: boolean
  onClose: () => void
  formId: any
}

const SupplierModal: React.FC<Properties> = ({ isOpen, onClose, formId }) => {
  const FormSchema = Yup.object().shape({
    yourName: Yup.string().required(),
    yourEmail: Yup.string().email().required(),
    yourCompany: Yup.string().required(),
    yourPhone: Yup.string().required(),
    yourCity: Yup.string().required(),
    yourSegment: Yup.string().required(),
    yourProducts: Yup.string().required(),
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formMessageFeedback, setFormMessageFeedback] = useState('')

  const formik = useFormik({
    initialValues: {
      yourName: '',
      yourEmail: '',
      yourCompany: '',
      yourPhone: '',
      yourCity: '',
      yourSegment: '',
      yourProducts: '',
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
    <Modal
      className="flex items-end justify-center md:items-center z-[100]"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className={classNames(
          `relative w-full bg-white px-4 md:px-[115px] py-20 md:rounded-3xl overflow-y-auto md:max-w-[900px] modal-form ${styles.modalForm}`
        )}
      >
        <h2 className="text-4xl text-darkness mb-4">Seja um fornecedor</h2>
        <p className="text-base text-darkness">
          Você gostaria de ter a representação da sua marca dentro do maior
          grupo de produtos hospitalares do Brasil?
          <br />
          Preencha o formulário abaixo com os dados da sua empresa, a descrição
          dos seus produtos e aguarde o contato do nosso Time de Relacionamento
          com Fornecedores.
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="relative gap-4 mt-10"
          noValidate
        >
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label htmlFor="yourCompany" className={styles.label}>
              Empresa
            </label>
            <input
              type="text"
              name="yourCompany"
              onChange={formik.handleChange}
              value={formik.values.yourCompany}
              className={classNames(styles.input, {
                [styles.inputError]:
                  formik.errors.yourCompany && formik.touched.yourCompany,
                [styles.inputDefault]:
                  !formik.errors.yourCompany || !formik.touched.yourCompany,
              })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="yourSegment" className={styles.label}>
              Segmento de atuação
            </label>
            <input
              type="text"
              name="yourSegment"
              onChange={formik.handleChange}
              value={formik.values.yourSegment}
              className={classNames(styles.input, {
                [styles.inputError]:
                  formik.errors.yourSegment && formik.touched.yourSegment,
                [styles.inputDefault]:
                  !formik.errors.yourSegment || !formik.touched.yourSegment,
              })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="yourPhone" className={styles.label}>
              Telefone
            </label>
            <input
              type="text"
              name="yourPhone"
              onChange={formik.handleChange}
              value={formik.values.yourPhone}
              className={classNames(styles.input, {
                [styles.inputError]:
                  formik.errors.yourPhone && formik.touched.yourPhone,
                [styles.inputDefault]:
                  !formik.errors.yourPhone || !formik.touched.yourPhone,
              })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="yourCity" className={styles.label}>
              Cidade
            </label>
            <input
              type="text"
              name="yourCity"
              onChange={formik.handleChange}
              value={formik.values.yourCity}
              className={classNames(styles.input, {
                [styles.inputError]:
                  formik.errors.yourCity && formik.touched.yourCity,
                [styles.inputDefault]:
                  !formik.errors.yourCity || !formik.touched.yourCity,
              })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="yourState" className={styles.label}>
              Quais produtos gostaria de oferecer?
            </label>
            <textarea
              name="yourProducts"
              onChange={formik.handleChange}
              value={formik.values.yourProducts}
              className={classNames(styles.input, {
                [styles.inputError]:
                  formik.errors.yourProducts && formik.touched.yourProducts,
                [styles.inputDefault]:
                  !formik.errors.yourProducts || !formik.touched.yourProducts,
              })}
              required
            />
          </div>
          <div className="flex justify-between items-center ">
            <button type="submit" className={styles.btn} disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar'}
              <ArrowRight className="w-6 h-[25px] ml-2 stroke-white" />
            </button>
            {isSubmitted && formMessageFeedback && (
              <div>
                <p>{formMessageFeedback}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default SupplierModal
