// import classNames from 'classnames'
// import { useFormik } from 'formik'
// import { m } from 'framer-motion'
// import React, { useMemo, useState } from 'react'
// import * as Yup from 'yup'

// import Grid from '~/components/grid'
// import RichText from '~/components/rich-text'
// import CartIcon from '~/icons/cart.svg'
// import { sendFormData } from '~/services/forms'

// import styles from './form.module.css'

// interface Properties {
//   formId: any
//   title: string
//   description: string
// }

// const BudgetForm: React.FC<Properties> = ({ formId, title, description }) => {
//   const coloredTitle = useMemo(
//     () => title?.replace('<em>', `<em class="text-destaque">`),
//     [title]
//   )

//   const FormSchema = Yup.object().shape({
//     yourName: Yup.string().required(),
//     yourCompany: Yup.string().required(),
//     yourCNPJ: Yup.string().required(),
//     yourEmail: Yup.string().email().required(),
//     yourPhone: Yup.string().required(),
//     yourCity: Yup.string().required(),
//     yourState: Yup.string().required(),
//   })

//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [formMessageFeedback, setFormMessageFeedback] = useState('')

//   const formik = useFormik({
//     initialValues: {
//       yourName: '',
//       yourCompany: '',
//       yourCNPJ: '',
//       yourEmail: '',
//       yourPhone: '',
//       yourCity: '',
//       yourState: '',
//     },
//     validationSchema: FormSchema,
//     onSubmit: async (values) => {
//       if (isLoading) {
//         return false
//       }

//       setIsLoading(true)

//       const response = await sendFormData({
//         formId,
//         data: values,
//       })

//       setFormMessageFeedback(response.data?.message)
//       setIsSubmitted(true)
//       setIsLoading(false)

//       setTimeout(() => {
//         setIsSubmitted(true)
//         setFormMessageFeedback('')
//       }, 4000)
//     },
//   })

//   return (
//     <div>
//       <m.div>
//         <Grid>
         
//         </Grid>
//       </m.div>
//     </div>
//   )
// }

// export default BudgetForm
