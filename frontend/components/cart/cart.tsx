import classNames from 'classnames'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { validateCNPJ, validatePhone } from 'validations-br'
import * as Yup from 'yup'

import Modal from '~/components/modal'
import { ICartItem } from '~/contexts/global/types'
import useGlobal from '~/hooks/use-global'
import CartIcon from '~/icons/cart.svg'
import CloseButton from '~/icons/close-button.svg'
import { sendFormData } from '~/services/forms'
import * as Masks from '~/utils/masks'

import CartItem from '../cart-item'
import Grid from '../grid'
import styles from './cart.module.css'

interface Properties {
  isOpen: boolean
  onClose: () => void
}

const Cart: React.FC<Properties> = ({ isOpen, onClose }) => {
  const { cart } = useGlobal()

  const FormSchema = Yup.object().shape({
    yourName: Yup.string().required(),
    yourCompany: Yup.string().required(),
    yourCNPJ: Yup.string()
      .required()
      .test('is-cnpj', 'CPNJ inválido', (value) => validateCNPJ(value ?? '')),
    yourEmailAddress: Yup.string().email().required(),
    yourPhone: Yup.string()
      .required()
      .test('is-phone', 'Telefone inválido', (value) =>
        validatePhone(value ?? '')
      ),
    yourCity: Yup.string().required(),
    yourState: Yup.string().required(),
  })

  const [showForm, setShowForm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formMessageFeedback, setFormMessageFeedback] = useState('')

  const formId = 5830
  const formReference = useRef(null)

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      setShowForm(false)
    }
  }, [cart.cartItems.length])

  useEffect(() => {
    if (showForm) {
      formReference.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    }
  }, [showForm])

  const formik = useFormik({
    initialValues: {
      yourName: '',
      yourCompany: '',
      yourCNPJ: '',
      yourEmailAddress: '',
      yourPhone: '',
      yourCity: '',
      yourState: '',
      products: '',
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      if (isLoading) {
        return false
      }

      setIsLoading(true)

      for (const product of cart.cartItems) {
        const { code, title, quantity } = product
        values.products += `Código: ${code}, Produto: ${title}, Quantidade ${quantity} <br />`
      }

      const response = await sendFormData({
        formId,
        data: values,
      })

      setFormMessageFeedback(response.data?.message)
      setIsSubmitted(true)
      setIsLoading(false)

      values.products = ''

      setTimeout(() => {
        setIsSubmitted(true)
        setFormMessageFeedback('')
        cart.clearCart()
      }, 4000)
    },
  })

  return (
    <Modal
      className="flex items-end justify-center md:items-center z-[100]"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={classNames('fixed top-0 right-0 z-[101] w-full')}>
        <Grid className="max-h-[100vh] overflow-y-scroll">
          <div className={styles.scrollbarHide}>
            <div className="py-6 grid grid-cols-12 gap-x-4 gap-y-4 text-base">
              <div className={classNames('col-span-7 md:col-span-8 text-4xl')}>
                Minha Sacola
              </div>
              <div
                className={classNames(
                  'col-span-5 md:col-span-4 col-start-8 md:col-start-9'
                )}
              >
                <CloseButton
                  className="ml-auto cursor-pointer"
                  onClick={() => {
                    setShowForm(false)
                    onClose()
                  }}
                />
              </div>
            </div>
            {cart.cartItems.length === 0 && (
              <div className={classNames('col-span-12')}>
                Não há itens na sua sacola no momento.
              </div>
            )}
            {cart.cartItems.length > 0 && (
              <div className="py-6 grid grid-cols-12 gap-x-4 gap-y-4 text-base">
                <div className={classNames('col-span-7 md:col-span-8')}>
                  Produtos
                </div>
                <div
                  className={classNames(
                    'col-span-5 md:col-span-4 col-start-8 md:col-start-9'
                  )}
                >
                  Quantidade
                </div>
                <ul className="col-span-12">
                  {cart.cartItems &&
                    cart.cartItems.map((item: ICartItem, index) => (
                      <CartItem {...item} key={index}></CartItem>
                    ))}
                </ul>
              </div>
            )}
            <div className="py-6 grid grid-cols-12 gap-x-4 gap-y-4 text-base cursor-pointer">
              <button
                className={classNames(
                  'col-span-4 text-base text-left underline',
                  {
                    hidden: cart.cartItems.length === 0,
                  }
                )}
                onClick={cart.clearCart}
              >
                Limpar Sacola
              </button>
              {showForm === false && (
                <div
                  className={classNames('col-span-8 lg:col-span-8 col-start-5')}
                >
                  <button
                    type="submit"
                    className={classNames(
                      'bg-darkness text-white flex py-[18px] px-5 md:px-8 rounded-[100px] text-base border-[1px] border-darkness hover:text-darkness hover:fill-darkness hover:stroke-darkness hover:bg-white items-center justify-center ml-auto',
                      { hidden: cart.cartItems.length === 0 }
                    )}
                    onClick={() => {
                      setShowForm(true)
                    }}
                  >
                    Solicitar Orçamento
                    <CartIcon className="w-6 h-6 ml-2 md:ml-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div
            ref={formReference}
            className={classNames(
              'col-span-12 md:col-span-8 md:col-start-5 1.5xl:col-span-5 1.5xl:col-start-8 overflow-hidden scrollbar-hide py-10 pl-6 pr-10 bg-neutralDefault text-darkness',
              { block: showForm, hidden: !showForm }
            )}
          >
            <h3
              className={classNames(
                'text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] mb-6'
              )}
            >
              Solicite um orçamento
            </h3>
            <p className={classNames('text-xl mb-6')}>
              Preencha o formulário e um de nossos representantes comerciais
              entrará em contato com orçamento.
            </p>
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
                  value={Masks.cnpj(formik.values.yourCNPJ)}
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
                <label htmlFor="yourEmailAddress" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  name="yourEmailAddress"
                  onChange={formik.handleChange}
                  value={formik.values.yourEmailAddress}
                  className={classNames(styles.input, {
                    [styles.inputError]:
                      formik.errors.yourEmailAddress &&
                      formik.touched.yourEmailAddress,
                    [styles.inputDefault]:
                      !formik.errors.yourEmailAddress ||
                      !formik.touched.yourEmailAddress,
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
                  value={Masks.phone(formik.values.yourPhone)}
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
              <div className="flex items-end flex-col">
                <button
                  type="submit"
                  className={styles.btn}
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Solicitar Orçamento'}
                  <CartIcon className="w-6 h-6 ml-4" />
                </button>
                {isSubmitted && formMessageFeedback && (
                  <div className="mt-4">
                    <p className="text-right">{formMessageFeedback}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </Grid>
      </div>
    </Modal>
  )
}

export default Cart
