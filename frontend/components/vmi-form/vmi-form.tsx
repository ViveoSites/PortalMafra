import classNames from 'classnames'
import { useFormik } from 'formik'
import { m } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import * as Yup from 'yup'

import Grid from '~/components/grid'
import RichText from '~/components/rich-text'
import useScrollAnimation from '~/helpers/use-scroll-animation'
import DarknessArrowRight from '~/icons/darkness-arrow-right.svg'
import { sendFormData } from '~/services/forms'

import styles from './form.module.css'

interface Properties {
  formId: any
  title: string
  description: string
}

const ContactForm: React.FC<Properties> = ({ formId, title, description }) => {
  const { animationRef, topDownShowAnimation } = useScrollAnimation()

  const coloredTitle = useMemo(
    () => title?.replace('<em>', `<em class="text-destaque">`),
    [title]
  )

  const FormSchema = Yup.object().shape({
    yourName: Yup.string().required(),
    yourCompany: Yup.string().required(),
    yourCNPJ: Yup.string().required(),
    yourEmail: Yup.string().email().required(),
    yourPhone: Yup.string().required(),
    yourCity: Yup.string().required(),
    yourState: Yup.string().required(),
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formMessageFeedback, setFormMessageFeedback] = useState('')

  const formik = useFormik({
    initialValues: {
      yourName: '',
      yourCompany: '',
      yourCNPJ: '',
      yourEmail: '',
      yourPhone: '',
      yourCity: '',
      yourState: '',
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
    <section ref={animationRef} className="vmi-form container">
      <m.div {...topDownShowAnimation()}>
        <Grid className="py-[60px] md:py-20 mt-10 mb-16 md:mb-[120px] px-4 md:px-10 bg-dark rounded-[32px]">
          <div className="col-span-12 md:col-span-5 text-white mb-10 md:mb-0">
            <RichText
              htmlText={coloredTitle}
              className={classNames(
                'lg:grid-cols-1 text-[32px] text-white leading-[40px] md:text-[40px] md:leading-[48px] mb-6'
              )}
            />
            <p className={classNames('text-xl')}>{description}</p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 rounded-[32px] mb-10 md:mb-0">
            <form
              onSubmit={formik.handleSubmit}
              className="relative gap-4"
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
                <label htmlFor="yourCNPJ" className={styles.label}>
                  CNPJ
                </label>
                <input
                  type="text"
                  name="yourCNPJ"
                  onChange={formik.handleChange}
                  value={formik.values.yourCNPJ}
                  className={classNames(styles.input, {
                    [styles.inputError]:
                      formik.errors.yourCNPJ && formik.touched.yourCNPJ,
                    [styles.inputDefault]:
                      !formik.errors.yourCNPJ || !formik.touched.yourCNPJ,
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
                  Estado
                </label>
                <input
                  type="text"
                  name="yourState"
                  onChange={formik.handleChange}
                  value={formik.values.yourState}
                  className={classNames(styles.input, {
                    [styles.inputError]:
                      formik.errors.yourState && formik.touched.yourState,
                    [styles.inputDefault]:
                      !formik.errors.yourState || !formik.touched.yourState,
                  })}
                  required
                />
              </div>
              <div className="flex justify-between items-center ">
                <button
                  type="submit"
                  className={styles.btn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar'}
                  <DarknessArrowRight className="w-6 h-[25px] ml-2" />
                </button>
                {isSubmitted && formMessageFeedback && (
                  <div>
                    <p>{formMessageFeedback}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </Grid>
      </m.div>
    </section>
  )
}

export default ContactForm
