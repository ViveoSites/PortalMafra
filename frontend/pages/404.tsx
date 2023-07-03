import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

import Button from '~/components/button'
import Grid from '~/components/grid'
import Image from '~/components/image'
import PageLoading from '~/components/page-loading'
import bgImage from '~/public/images/404.png'

const featuredImage = {
  src: bgImage,
  width: 1440,
  height: 836,
  alt: 'bg-image',
}

const LayoutDefault = dynamic(() => import('~/layouts/default'), {
  loading: () => <PageLoading />,
})

const NotFoundPage = () => {
  return (
    <LayoutDefault>
      <NextSeo title="Página não encontrada" />
      <div className="relative">
        <Image
          {...featuredImage}
          className="absolute object-left lg:object-bottom object-cover left-0 -top-20 w-full h-full"
        />
        <Grid className="container">
          <div className="relative z-10 col-span-full lg:col-span-5 py-9 md:py-20 h-screen lg:h-[50rem] 2xl:h-screen flex flex-col justify-center gap-y-6 text-white">
            <h2 className="text-5xl lg:text-7xl">Página não encontrada!</h2>
            <p>Parece que a página que você estava buscando não existe.</p>
            <Button
              buttonExtraClasses="text-white border-white hover:bg-white hover:!text-darkness hover:border-white"
              label="Voltar a página inicial"
              link="/"
            />
          </div>
        </Grid>
      </div>
    </LayoutDefault>
  )
}

export default NotFoundPage
