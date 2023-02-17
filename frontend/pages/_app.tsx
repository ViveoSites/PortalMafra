import '~/styles/global.css'

import { Inter } from '@next/font/google'
// import localFont from '@next/font/local'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import React from 'react'
import { setLocale } from 'yup'
import { pt } from 'yup-locales'

import Footer from '~/components/footer'
import Header from '~/components/header'
import Contexts from '~/contexts/index'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// const antarctica = localFont({
//   src: [
//     {
//       path: '../assets/fonts/Antarctica-VF.woff2',
//       weight: 'normal',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-antarctica',
// })

setLocale(pt)

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt-BR',
          url: process.env.siteUrl,
          site_name: 'SITE_NAME',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      {/* <div className={`${antarctica.variable} ${inter.variable} font-inter`}> */}
      <Contexts>
        <div className={`${inter.variable} font-inter`}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </Contexts>
    </>
  )
}

export default MyApp
