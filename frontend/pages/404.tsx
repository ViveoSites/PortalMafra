import { NextSeo } from 'next-seo'

import Layout from '~/layouts/default'

const NotFoundPage = ({ message }) => {
  return (
    <Layout>
      <NextSeo title="Página não encontrada" />

      <div className="container py-9 md:py-20">
        <div className="prose">
          <h2>Página não encontrada</h2>

          {message && <p>{message}</p>}

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            explicabo! Totam inventore iure sed adipisci quaerat architecto
            assumenda, ipsam rerum.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dolore
            repellat tempore assumenda neque ratione, et voluptatibus iusto, ab
            odio aliquam voluptatem molestias non sapiente saepe laudantium
            commodi suscipit illum veniam tenetur dignissimos! Maiores vero
            molestias, expedita ut modi harum?
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
